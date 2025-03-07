import fs from "vite-plugin-fs/browser";

export enum ItemCategory {
  LOGISTICS,
  PRODUCTION,
  INTERMEDIATE,
  COMBAT,
  FLUIDS,
  TECHNOLOGY,
}

export interface Item {
  id: string;
  name: string;
  category: string;
  row: number;
  stack?: number;
  belt?: Belt;
  machine?: Machine;
  pipe?: Pipe;
  cargoWagon?: CargoWagon;
  fluidWagon?: FluidWagon;
  beacon?: Beacon;
  module?: Module;
  fuel?: Fuel;
  technology?: Technology;
  icon?: string;
  iconText?: string;
}

export interface Belt {
  speed: number;
}

export interface Machine {
  speed: number;
  type?: string;
  fuelCategories?: string[];
  usage?: number;
  pollution?: number;
  size: [number, number];
  modules?: number;
  drain?: number;
  disallowedEffects?: string[];
  entityType?: string;
  silo?: Silo;
}

export interface Silo {
  parts: number;
  launch: number;
}

export interface Pipe {
  speed: number;
}

export interface CargoWagon {
  size: number;
}

export interface FluidWagon {
  capacity: number;
}

export interface Beacon {
  effectivity: number;
  modules: number;
  range: number;
  type: string;
  usage: number;
  disallowedEffects?: string[];
  size: [number, number];
  profile: number[];
}

export interface Module {
  consumption?: number;
  quality?: number;
  speed?: number;
  pollution?: number;
  productivity?: number;
}

export interface Fuel {
  category: string;
  value: number;
  result?: string;
}

export interface Technology {
  prerequisites?: string[];
  unlockedRecipes?: string[];
}

export function getCategoryForItem(fileCategory: string) {
  switch (fileCategory) {
    case "logistics":
      return ItemCategory.LOGISTICS;
    case "production":
      return ItemCategory.PRODUCTION;
    case "intermediate-products":
      return ItemCategory.INTERMEDIATE;
    case "combat":
      return ItemCategory.COMBAT;
    case "fluids":
      return ItemCategory.FLUIDS;
    case "technology":
      return ItemCategory.TECHNOLOGY;
    default:
      console.error(`Category ${fileCategory} does not exist!`);
      return ItemCategory.TECHNOLOGY;
  }
}

export async function loadItemsFromFile(filePath: string): Promise<Item[]> {
  try {
    const jsonData = await fs.readFile(filePath);
    const items: Item[] = JSON.parse(jsonData);
    return items;
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return [];
  }
}
