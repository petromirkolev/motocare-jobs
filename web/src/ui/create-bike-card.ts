/* This file contains the createBikeCard function, which generates an HTML element representing a bike card in the UI. The card includes the bike's name, meta information, odometer reading, and action buttons for editing and deleting the bike. */

import type { Bike } from '../types/bikes';

export function createBikeCard(bike: Bike): HTMLElement {
  const id = String(bike.id);

  const article = document.createElement('article');
  article.className = 'card bike-card';
  article.dataset.bikeId = id;
  article.setAttribute('data-testid', `card-bike-${id}`);

  article.innerHTML = `
  <div>
    <h4 data-testid="bike-name"></h4>
    <p class="muted" data-testid="bike-meta"></p>
  </div>
  <span class="tag" data-testid="bike-tag"></span>
`;

  const nameEl = article.querySelector('[data-testid="bike-name"]');
  const paraEl = article.querySelector('[data-testid="bike-meta"]');
  const spanEl = article.querySelector('[data-testid="bike-tag"]');

  if (!nameEl || !paraEl || !spanEl) {
    throw new Error('Bike card template missing expected elements');
  }

  nameEl.textContent = bike.make;
  paraEl.textContent = `${bike.year} ${bike.make} ${bike.model}`;
  spanEl.textContent = 'Not ready';

  return article;
}
