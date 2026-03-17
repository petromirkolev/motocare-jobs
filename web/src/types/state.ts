/* This file defines the structure of the application's state, including the types for bikes, maintenance items, and maintenance logs. It also initializes the appState with default values.
 */

import type { Bike } from './bikes';

export type StoreState = {
  bikes: Bike[];
};

type AppState = {
  selectedBikeId: string | null;
};

export const appState: AppState = {
  selectedBikeId: null,
};
