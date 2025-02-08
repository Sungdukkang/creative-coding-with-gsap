import { Clock } from './clock';
import { Marquee } from './marquee';
import { Grid } from './grid';
import { Heading } from './heading';
import { ToolkitText } from './toolkit';
import { ColorModeButton } from './colorModeButton';

import { reveal } from './helpers/reveal';

class App {
  constructor() {
    this.clock = null;
    this.marquess = [];
    this.grid = null;
    this.heading = null;
    this.toolkit = null;
    this.colorModeButton = null;
  }

  init() {
    console.log("App initializing...");

    // Clock
    this.clock = new Clock(".hero_clock");

    // Grid
    if (this.grid) this.grid.destroy();
    this.grid = new Grid();

    // Marquees
    const marqueeElements = document.querySelectorAll('.marquee');
    marqueeElements.forEach((marqueeElement, i) => {
      const marquee = new Marquee(marqueeElement, {
        pauseOnHover: true,
        reversed: i % 2 === 0,
        scrollTrigger: true,
      });
      this.marquess.push(marquee);
    });

    // Heading
    this.heading = new Heading (document.querySelector(".hero_h1"));
    
    // ToolkitText
    if (this.toolkit) this.toolkit.destroy();
    this.toolkit = new ToolkitText(".toolkit_p");
    
    // Initialize ColorModeButton and pass a reference to the handler
    this.colorModeButton = new ColorModeButton(() => this.handleColorModeChange());

    reveal();
  }

  handleColorModeChange() {
    console.log("Color mode changed, reinitializing necessary components...");
    
    // Update the grid
    if (this.grid) this.grid.destroy();
    this.grid = new Grid();

    // Update the toolkit
    if (this.toolkit) this.toolkit.destroy();
    this.toolkit = new ToolkitText(".toolkit_p");

    // Any other components taht depend on color mode changes can also be updated here
    console.log("Color mode-related reinitialization complete.");
  }

  listenToMotionPreferenceChange() {

  }

  start() {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
      this.init();
    });
  }
}


// Initaniate and start the app
const app = new App();
app.start();

