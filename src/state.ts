import { ProductionLine } from "./calc/types";

export interface AppState {
  production: ProductionLine[];
}

export const defaultAppState = {
  production: [],
} as AppState;
