import { Clock } from './clock';
import { Marquee } from './marquee';
import { Grid } from './grid';

import { reveal } from './helpers/reveal';

const clock = new Clock('.hero_clock');
const grid = new Grid();

// Wait for fonts to load
document.fonts.ready.then(() => {
  // marquees
  const marqueeElements = document.querySelectorAll('.marquee');
  marqueeElements.forEach((marqueeElement, i) => {
    const marquee = new Marquee(marqueeElement, {
      pauseOnHover: true,
      reversed: i % 2 === 0,
      scrollTrigger: true,
    });
  });
});

reveal();