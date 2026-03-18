import { getCurrentUser } from '../state/auth-store';
import type { Bike } from '../types/bikes';

export function createBikeCard(bike: Bike, isReady: boolean): HTMLElement {
  const id = String(bike.id);
  const user = getCurrentUser();
  if (!user) throw new Error('No user found');

  const article = document.createElement('article');
  article.className = 'card bike-card';
  article.dataset.bikeId = id;
  article.setAttribute('data-testid', `card-bike-${id}`);

  article.innerHTML = `
  <div class="bike-card-main" data-testid="bike-card-main">
    <div class="bike-card-text">
      <h4 data-testid="bike-name"></h4>
      <p class="muted" data-testid="bike-meta"></p>
    </div>
    <div class="bike-card-actions" data-testid="bike-card-actions">
      <span class="tag" data-testid="bike-tag"></span>
      <button type="button" class="ghost danger bike-delete-btn"
      data-testid="btn-delete-bike"
      data-bike-id="${id}"
      data-action="delete-bike">Delete</button>
    </div>
  </div>
`;

  const nameEl = article.querySelector('[data-testid="bike-name"]');
  const paraEl = article.querySelector('[data-testid="bike-meta"]');
  const tagEl = article.querySelector('[data-testid="bike-tag"]');

  if (!nameEl || !paraEl || !tagEl) {
    throw new Error('Bike card template missing expected elements');
  }

  nameEl.textContent = bike.make;
  paraEl.textContent = `${bike.year} ${bike.make} ${bike.model}`;
  tagEl.textContent = isReady ? 'Ready' : 'Not ready';

  tagEl.classList.toggle('danger-tag', !isReady);

  return article;
}
