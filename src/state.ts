import { ProductionLine } from "./calc/types";

export interface AppState {
  production: ProductionLine[];
  electricityPanelOpen: boolean;
  productionPanelOpen: boolean;
}

export const defaultAppState = {
  production: [],
  electricityPanelOpen: false,
  productionPanelOpen: false,
} as AppState;
