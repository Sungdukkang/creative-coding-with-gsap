import { Clock } from './clock';
import { Marquee } from './marquee';

import { reveal } from './helpers/reveal';

const clock = new Clock('.hero_clock');

// Wait for fonts to load
document.fonts.ready.then(() => {
  const marqueeElements = document.querySelectorAll('.marquee');
  const marquees = [];

  marqueeElements.forEach((marqueeElement, i) => {
    const marquee = new Marquee(marqueeElement, {
      pauseOnHover: true,
      reversed: i % 2 === 0
    });
    marquees.push(marquee);
  });

  const destroyBtn = document.querySelector('.destroy_marquees');
  destroyBtn.addEventListener('click', () => marquees.forEach((marquee) => marquee.destroy()));
});

reveal();