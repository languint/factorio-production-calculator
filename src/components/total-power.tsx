import { getMachineCount } from "@/calc/calculate-production";
import { getProductionBuilding } from "@/calc/get-production-building";
import { Node } from "@/calc/types";
import { AppConfig } from "@/config";
import { getItem, getPowerConsumption, getRecipes } from "@/types/data";
import { HierarchyNode } from "d3-hierarchy";

export function totalPower(appConfig: AppConfig, root: HierarchyNode<Node>) {
    return root.descendants().reduce((acc, d) => {
        if (!d.data.item) return acc;
    
        const recipes = getRecipes(d.data.item.id);
    
        const machineId =
          getProductionBuilding(appConfig, recipes!) ??
          "assembling-machine-1";
    
        const numberOfMachines = getMachineCount(
          machineId,
          d.data.rate,
          d.data.item,
          appConfig.bonuses.mining
        );
    
        const machine = getItem(machineId);
        const power =
          machine && getPowerConsumption(machine)
            ? getPowerConsumption(machine) *
              (numberOfMachines !== 0
                ? Number.parseFloat(numberOfMachines)
                : numberOfMachines)
            : 0;
    
        return acc + power;
      }, 0);
}