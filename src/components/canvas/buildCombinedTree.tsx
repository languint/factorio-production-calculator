import { Node } from "@/calc/types";
import { getItem } from "@/types/data";

export function buildCombinedTree(
  finalItemId: string,
  nodeMap: Map<string, { id: string; rate: number; }>,
  edges: Map<string, Set<string>>): Node {
  const visited = new Set<string>();

  function buildTree(itemId: string): Node {
    const dagNode = nodeMap.get(itemId);
    const newNode: Node = {
      item: getItem(itemId)!,
      rate: dagNode ? dagNode.rate : 0,
      machine: "",
      children: [],
    };
    visited.add(itemId);

    const childrenIds = edges.get(itemId);
    if (childrenIds) {
      childrenIds.forEach((childId) => {
        if (!visited.has(childId)) {
          newNode.children!.push(buildTree(childId));
        }
      });
    }
    return newNode;
  }

  return buildTree(finalItemId);
}
