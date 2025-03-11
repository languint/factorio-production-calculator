import { Modules } from "@/types/modules";

export type Bonus = "speed" | "productivity";

export interface Result {
  powerConsumption: number;
  bonuses: Map<Bonus, number>;
}

export function getModuleBonus(module: Modules): Result {
  const bonuses = new Map<Bonus, number>();
  let powerConsumption = 1;

  switch (module) {
    case "speed-module":
      powerConsumption += 0.5;
      bonuses.set("speed", 0.2);
      break;
    case "speed-module-2":
      powerConsumption += 0.6;
      bonuses.set("speed", 0.3);
      break;
    case "speed-module-3":
      powerConsumption += 0.7;
      bonuses.set("speed", 0.5);
      break;
    case "efficiency-module":
      powerConsumption -= 0.3;
      break;
    case "efficiency-module-2":
      powerConsumption -= 0.4;
      break;
    case "efficiency-module-3":
      powerConsumption -= 0.5;
      break;
    case "productivity-module":
      powerConsumption += 0.4;
      bonuses.set("productivity", 0.04);
      bonuses.set("speed", (bonuses.get("speed") ?? 0) - 0.05);
      break;
    case "productivity-module-2":
      powerConsumption += 0.6;
      bonuses.set("speed", (bonuses.get("speed") ?? 0) - 0.1);
      bonuses.set("productivity", 0.06);
      break;
    case "productivity-module-3":
      powerConsumption += 0.8;
      bonuses.set("speed", (bonuses.get("speed") ?? 0) - 0.15);
      bonuses.set("productivity", 0.1);
      break;
  }

  return {
    bonuses,
    powerConsumption: Math.max(0.2, powerConsumption),
  };
}

export function getModuleBonuses(modules: Modules[]): Result {
  const bonuses = new Map<Bonus, number>();
  let powerConsumptionMultiplier = 1;

  for (const module of modules) {
    const result = getModuleBonus(module);

    result.bonuses.forEach((v, k) => {
      bonuses.set(k, (bonuses.get(k) ?? 0) + v);
    });

    powerConsumptionMultiplier += result.powerConsumption;
  }

  return {
    bonuses,
    powerConsumption: powerConsumptionMultiplier,
  };
}
