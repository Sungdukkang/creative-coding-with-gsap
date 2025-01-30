import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export class Marquee {
  constructor(rootElement, config = {}) {
    console.log("Marquee initialized");
    this.marquee = rootElement;
    this.marqueeInner = this.marquee.querySelector(".marquee_inner");
    this.animation = null;

    this.speed = config.speed || 4; // how many seconds it takes to scroll one marqueeInnerWidth
    this.reversed = config.reversed || false;
    this.pauseOnHover = config.pauseOnHover || false;
    this.scrollTrigger = config.scrollTrigger || null;

    this.updateDimensions();
    this.setup();
    this.animate();

    // Handle resize
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.marquee);

    // Pause on hover
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    if (this.pauseOnHover) {
      this.marquee.addEventListener("mouseover", this.pause);
      this.marquee.addEventListener("mouseout", this.play);
    }
  }

  updateDimensions() {
    this.marqueeInnerWidth = this.marqueeInner.offsetWidth;
    this.marqueeWidth = this.marquee.offsetWidth;
    this.gap = parseFloat(getComputedStyle(this.marquee).gap) || 0;
  }

  setup() {
    // Clear any existing clones
    const existingClones = this.marquee.querySelectorAll(".marquee_inner:not(:first-child)");
    existingClones.forEach((clone) => clone.remove());

    // Calculate how many copies we need to fill the container plus one extra
    // to ensure smooth infinite scrolling
    const numCopies = Math.ceil(this.marqueeWidth / this.marqueeInnerWidth) + 1;

    // Clean up old wrapper if it exists
    if (this.wrapper) {
      this.wrapper.remove();
    }

    // Create a wrapper for all marquee inners
    this.wrapper = document.createElement("div");
    this.wrapper.style.display = "flex";
    this.wrapper.style.gap = `${this.gap}px`;
    this.wrapper.style.position = "relative";
    this.wrapper.style.left = this.reversed ? `-${this.marqueeInnerWidth}px` : "0";

    // Check if marqueeInner needs to be moved
    if (this.marqueeInner.parentNode !== this.wrapper) {      
      this.marqueeInner.remove();
      this.wrapper.appendChild(this.marqueeInner);
    }

    // Add the neccessary copies
    for (let i = 0; i < numCopies; i++) {
      const clone = this.marqueeInner.cloneNode(true);
      this.wrapper.appendChild(clone);
    }

    this.marquee.appendChild(this.wrapper);
  }

  animate() {
    // Calculate the total width of one item (including gap)
    const itemWidth = this.marqueeInnerWidth + this.gap;
    const tlConfig = {
      defaults: { ease: "none", duration: this.speed },
      repeat: -1
    }

    if (this.scrollTrigger) {
      tlConfig.scrollTrigger = {
        trigger: this.marquee,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause play pause",
        ...this.scrollTrigger,
      }
    }

    // Create the animation
    this.animation = gsap.timeline(tlConfig);
    this.animation.fromTo(this.wrapper, { x: 0 }, { x: this.reversed ? itemWidth : -itemWidth });
  }

  handleResize() {
    // Update dimensions
    this.updateDimensions();

    // Kill existing animation
    if (this.animation) {
      this.animation.kill();
    }

    // Rebuild the marquee
    this.setup();
    this.animate();
  }

  pause() {
    if (!this.animation) return;
    this.animation.pause();
  }

  play() {
    if (!this.animation) return;
    this.animation.play();
  }

  destroy() {
    // Stop the animation
    if (this.animation) {
      this.animation.kill();
      this.animation = null;
    }

    // Remove all event listeners and observers that were added to the marquee
    this.marquee.removeEventListener("mouseover", this.pause);
    this.marquee.removeEventListener("mouseout", this.play);
    this.resizeObserver.disconnect();

    // Reset marquee to intial state
    if (this.wrapper) {
      this.wrapper.remove();
      this.marquee.appendChild(this.marqueeInner);
    }

    console.log("Marquee destroyed");
  }
}