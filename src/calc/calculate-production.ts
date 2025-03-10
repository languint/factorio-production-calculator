import { getItem, getRecipes, Item } from "@/types/data";
import { Node, ProductionLine } from "./types";
import { getProductionBuilding } from "./get-production-building";
import { AppConfig } from "@/config";
import { toast } from "sonner";

export function calculateProduction(
  config: AppConfig,
  line: ProductionLine
): Node {
  if (!line.item) return {} as Node;

  const rootRecipes = getRecipes(line.item.id);

  if (rootRecipes || rootRecipes!.length === 0) {
    toast.error(
      `Failed to calculate! Could not find recipe for ${line.item.id}.`
    );
    console.error("Failed to calculate production of " + line.item.id);
    return {} as Node;
  }

  const rootNode: Node = {
    item: getItem(line.item.id)!,
    machine: getProductionBuilding(config, rootRecipes!)!,
    rate: line.rate || 1,
    children: [],
  };

  rootNode.children = calculateNode(config, rootNode, [rootNode.item.id]);
  return rootNode;
}

function calculateNode(config: AppConfig, node: Node, path: string[]): Node[] {
  const children: Node[] = [];

  const recipes = getRecipes(node.item.id);
  if (!recipes || recipes.length === 0) {
    console.log(`No recipe found for ${node.item.id}`);
    return children;
  }

  const chosenRecipe = recipes[0];

  Object.keys(chosenRecipe.in).forEach((inputId) => {
    if (path.includes(inputId)) {
      console.log(`Cycle detected for ${inputId}, skipping recursion.`);
      return;
    }

    const childRecipes = getRecipes(inputId);
    if (!childRecipes || childRecipes.length === 0) {
      console.log(`No recipe found for ${inputId}`);
      return;
    }

    const inputAmount = chosenRecipe!.in[inputId];
    const outputAmount = chosenRecipe!.out[node.item.id] || 1;

    const childNode: Node = {
      item: getItem(inputId)!,
      machine: getProductionBuilding(config, childRecipes)!,
      rate: (node.rate * inputAmount) / outputAmount,
      children: [],
    };

    childNode.children = calculateNode(config, childNode, [...path, inputId]);
    children.push(childNode);
  });

  return children;
}

export function getMachineCount(
  machineId: string,
  rate: number,
  item: Item,
  miningProductivity: number
) {
  const machine = getItem(machineId);

  if (!machine?.machine) return 0;

  if (machineId === "offshore-pump") return (rate / 12000).toFixed(2) + "x";
  if (machineId === "pumpjack") return (rate / 10).toFixed(2) + "%";
  if (machineId === "oil-refinery") return ((rate * 60) / 500).toFixed(2) + "x";

  if (machineId === "electric-mining-drill")
    return (
      Math.max(rate * 2 * (1 - 0.1 * miningProductivity), 1).toFixed(2) + "x"
    );

  const recipes = getRecipes(item.id);

  const recipeTime = recipes && recipes[0] ? recipes[0].time : 1;
  const machineSpeed = getItem(machineId)?.machine?.speed ?? 0.5;

  if (machineId.includes("assembling-machine"))
    return ((rate * recipeTime) / machineSpeed).toFixed(2) + "x";

  return ((rate * recipeTime) / machineSpeed).toFixed(2) + "x";
}
