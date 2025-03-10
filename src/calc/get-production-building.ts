import { AppConfig } from "@/config";
import { Recipe } from "@/types/data";

export function getProductionBuilding(
  config: AppConfig,
  recipes: Recipe[]
): string | undefined {
  if(!recipes) return;
  const producers = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.producers))
  );

  if (producers.includes("burner-mining-drill")) return "electric-mining-drill";

  if (config.production.preferRefinery && producers.includes("oil-refinery")) {
    return "oil-refinery";
  }

  const hasAssembly = producers.includes(config.production.assembly);
  const hasFurnace = producers.includes(config.production.furnace);

  if (hasAssembly && !hasFurnace) {
    return config.production.assembly;
  }

  if (!hasAssembly && hasFurnace) {
    return config.production.furnace;
  }

  if (hasAssembly && hasFurnace) {
    return config.production.assembly;
  }

  if (producers.length > 0) {
    return producers[producers.length - 1];
  }

  return undefined;
}
