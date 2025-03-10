import { AppConfig } from "@/config";
import { getRecipes } from "@/types/data";

export function buildDAG(_config: AppConfig, finalItemId: string, finalRate: number) {
  const nodeMap = new Map<string, { id: string; rate: number; }>();

  const edges = new Map<string, Set<string>>();
  const allEdges: Array<{ source: string; target: string; value: number; }> = [];

  function visit(itemId: string, rate: number) {
    if (nodeMap.has(itemId)) {
      nodeMap.get(itemId)!.rate += rate;
    } else {
      nodeMap.set(itemId, { id: itemId, rate });
    }

    const recipes = getRecipes(itemId);
    if (!recipes || recipes.length === 0) return;

    const recipe = recipes[0];
    const outAmount = recipe.out[itemId] ?? 1;

    for (const [childId, inAmount] of Object.entries(recipe.in)) {
      const childRate = (rate * inAmount) / outAmount;
      allEdges.push({ source: childId, target: itemId, value: childRate });

      if (!edges.has(itemId)) edges.set(itemId, new Set());
      edges.get(itemId)!.add(childId);

      visit(childId, childRate);
    }
  }

  visit(finalItemId, finalRate);
  return { nodeMap, edges, allEdges };
}
