import { FurnaceBuildings, AssemblyBuildings } from "./types/buildings";
import { LogisticsBelt } from "./types/logistics";
import { Modules } from "./types/modules";
import { ItemRateUnit, PowerUnit } from "./types/units";

export interface AppConfig {
  bonuses: {
    mining: number;
  };
  logistics: {
    belt: LogisticsBelt;
  };
  production: {
    furnace: FurnaceBuildings;
    assembly: AssemblyBuildings;
    preferRefinery: boolean;
    modules: Map<Modules, number>;
  };
  display: {
    itemUnits: ItemRateUnit;
    powerUnits: PowerUnit;
    showFlow: boolean;
  };
}

export const defaultConfig = {
  bonuses: {
    mining: 0,
  },
  logistics: {
    belt: "transport-belt",
  },
  production: {
    furnace: "stone-furnace",
    assembly: "assembling-machine-1",
    preferRefinery: true,
    modules: new Map(),
  },
  display: {
    itemUnits: "minute",
    powerUnits: "MW",
    showFlow: true,
  },
} as AppConfig;
