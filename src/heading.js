import gsap from "gsap";
import SplitType from "split-type";

export class Heading {
  constructor(element) {
    this.heading = element;
    this.setup();
  }

  setup() {
    this.chars = this.splitText(this.heading);
    this.createDuplicateChars();
    this.animateHeading();
  }

  splitText(elementToSplit) {
    const splitTypeObject = new SplitType(elementToSplit, {
      types: "chars",
    });

    const { chars } = splitTypeObject;
    chars.forEach((char) => {
      char.style.overflow = "clip";
      char.style.position = "relative";
    });
    return splitTypeObject.chars;
  }

  createDuplicateChars()  {
    // create duplicate chars.
    // first is below
    // second is to left
    // third is above
    // fourth is to right
    this.chars.forEach((char, index) => {
      const charCloneUnshifted = char.cloneNode(true);
      const charCloneShifted = char.cloneNode(true);

      // make pos absolute
      charCloneShifted.style.position = "absolute";
      charCloneShifted.style.inset = "0";

      if (index % 4 === 0) {
        gsap.set(charCloneShifted, { yPercent: 100 });
      } 
      if (index % 4 === 1) {
        gsap.set(charCloneShifted, { xPercent: -100 });
      } 
      if (index % 4 === 2) {
        gsap.set(charCloneShifted, { yPercent: -100 });
      }
      if (index % 4 === 3) {
        gsap.set(charCloneShifted, { xPercent: 100 });
      }
      char.innerHTML = ""; // clear the original char
      char.appendChild(charCloneUnshifted);
      char.appendChild(charCloneShifted);
    });
  }

  animateHeading() {
    // Create a repeating timeline
    const tl = gsap.timeline({
      repeat: -1, // -1 means infinite repeat
      repeatDelay: 1, // Add a 1 second pause between each repeat
      defaults: {
        duration: 1,
        ease: "power4.out",
        yoyo: true, // Makes the animation reverse
        repeat: 1, // Go forward and back once
      },
    });

    // Helper function to get random delay between 2 and 3 seconds
    const getRandomDelay = () => Math.random() + 2; // This will give us 2-3 seconds

    // Animate each child of this.chars
    this.chars.forEach((char, index) => {
      const charCloneUnshifted = char.children[0];
      const charCloneShifted = char.children[1];
      const delay = getRandomDelay();

      if (index % 4 === 0) {
        tl.to(charCloneShifted, { yPercent: 0, }, delay)
        tl.to(charCloneUnshifted, { yPercent: -100, }, delay);
      }

      if (index % 4 === 1) {
        tl.to(charCloneShifted, { xPercent: 0, }, delay)
        tl.to(charCloneUnshifted, { xPercent: 100, }, delay);
      }

      if (index % 4 === 2) {
        tl.to(charCloneShifted, { yPercent: 0, }, delay)
        tl.to(charCloneUnshifted, { yPercent: 100, }, delay);
      }

      if (index % 4 === 3) {
        tl.to(charCloneShifted, { xPercent: 0, }, delay)
        tl.to(charCloneUnshifted, { xPercent: -100, }, delay);
      }
    });
  }
}