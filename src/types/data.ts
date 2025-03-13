import ITEMS from "../data/items.json";
import ICONS from "../data/icons.json";
import RECIPES from "../data/recipes.json";

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

export interface ItemDisplay {
  id: string;
  position: string; // xpx, ypx
  color: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: ItemCategory;
  row: number;
  time: number;
  in: { [k: string]: number };
  out: { [k: string]: number };
  producers: string[];
  icon: string;
  flags: string[];
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
      return ItemCategory.TECHNOLOGY;
  }
}

export function loadItems(): Item[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ITEMS.map((item: any) => {
      if (item.machine && item.machine.size && item.machine.size.length === 2) {
        item.machine.size = [item.machine.size[0], item.machine.size[1]] as [
          number,
          number
        ];
      }
      return item as Item;
    });
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return [];
  }
}

export function getItem(id: string): Item | undefined {
  try {
    return ITEMS.filter((i) => i.id === id)[0] as Item;
  } catch (error) {
    console.error("Error reading or parsing file:", error);
  }
}

export function loadIcons(): ItemDisplay[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ICONS.map((item: any) => {
      if (!item) return undefined;
      return item as ItemDisplay;
    }).filter((item): item is ItemDisplay => item !== undefined);
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return [];
  }
}

export function loadRecipes(): Recipe[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return RECIPES.map((item: any) => {
      if (!item.icon) {
        item.icon = item.id;
      }
      return item as Recipe;
    });
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return [];
  }
}

export function getIconClip(name: string): string {
  if (name === undefined) return "";

  const icon = ICONS.find((v) => v.id === name);
  const item = ITEMS.find((v) => v.id === name);

  if (!icon && item?.category === "technology") {
    return "-594px 0pxz";
  }

  if (!icon) {
    console.warn("Failed to find icon for " + name + "!");
    return "";
  }

  return icon.position;
}

export function getIconColor(name: string): string {
  const icon = ICONS.find((v) => v.id === name);
  const item = ITEMS.find((v) => v.id === name);

  if (!icon && item?.category === "technology") {
    return "var(--card)";
  }

  if (!icon) {
    console.warn("Failed to find color for " + name + "!");
    return "";
  }

  return icon.color;
}

export function getItemName(name: string): string {
  const icon = ITEMS.find((v) => v.id === name);

  if (!icon) {
    console.warn("Failed to find name for " + name + "!");
    return "";
  }

  return icon.name;
}

export function getRecipe(name: string): Recipe | undefined {
  const recipe = RECIPES.find((v) => {
    // const out = v.out;

    // if (Object.keys(out).find((i) => i === name)) return true;

    return v.id === name;
  });

  if (!recipe) {
    console.warn("Failed to find recipe for " + name + "!");
    return;
  }

  return {
    ...recipe,
    category: getCategoryForItem(recipe.category),
  } as unknown as Recipe;
}

export function shouldIgnoreRecipe(recipe: Recipe): boolean {
  if (recipe.flags) {
    if (recipe.id.includes("barrel")) return true;
  }

  return false;
}

export function getRecipes(name: string): Recipe[] | undefined {
  const recipes = RECIPES.filter((recipe) => {
    if (shouldIgnoreRecipe(recipe as unknown as Recipe)) return false;
    return recipe.out && Object.prototype.hasOwnProperty.call(recipe.out, name);
  });

  if (recipes.length === 0) {
    console.warn("Failed to find recipes for " + name + "!");
    return;
  }

  return recipes.map((r) => ({
    ...r,
    category: getCategoryForItem(r.id),
  })) as unknown as Recipe[];
}

export function getPowerConsumption(item: Item) {
  if (!item) return 0;
  if (item.machine) {
    if (item.machine!.type === "electric") {
      return (item.machine.drain ?? 0) + (item.machine.usage ?? 0);
    }
  }

  return 0;
}
