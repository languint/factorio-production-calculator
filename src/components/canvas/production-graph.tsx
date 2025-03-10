/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMachineCount } from "@/calc/calculate-production";
import { Node } from "@/calc/types";
import { AppConfig } from "@/config";
import { AppState } from "@/state";
import {
  getIconColor,
  getItem,
  getPowerConsumption,
  getRecipes,
  Item,
  ItemDisplay,
  Recipe,
} from "@/types/data";
import { Dispatch, RefObject, SetStateAction } from "react";
import { ProductionNode } from "./production-node";
import { hierarchy, tree } from "d3-hierarchy";
import { getProductionBuilding } from "@/calc/get-production-building";
import { buildDAG } from "./buildDAG";
import { buildCombinedTree } from "./buildCombinedTree";
import { toast } from "sonner";

interface ProductionGraphProps {
  appConfig: AppConfig;
  setAppConfig: Dispatch<SetStateAction<AppConfig>>;
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  icons: ItemDisplay[];
  setIcons: Dispatch<SetStateAction<ItemDisplay[]>>;
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  powerConsumption: RefObject<number>;
}

const NODE_WIDTH = 360;
const NODE_HEIGHT = 120;

export function ProductionGraph(props: ProductionGraphProps) {
  const startingTime = Date.now();
  const finalLine = props.appState.production[0];
  if (!finalLine || !finalLine.item) return null;

  const finalItemId = finalLine.item.id;
  const finalRate = finalLine.rate ?? 10;

  const { nodeMap, edges, allEdges } = buildDAG(
    props.appConfig,
    finalItemId,
    finalRate
  );
  const combinedTree = buildCombinedTree(finalItemId, nodeMap, edges);

  const root = hierarchy<Node>(combinedTree);
  const treeLayout = tree<Node>().nodeSize([180, 600]);
  treeLayout(root);

  root.each((d) => {
    (d as any).screenX = d.y;
    (d as any).screenY = d.x;
  });

  const allNodes = root.descendants();
  const minX = Math.min(...allNodes.map((d) => (d as any).screenX));
  const minY = Math.min(...allNodes.map((d) => (d as any).screenY));

  allNodes.forEach((d) => {
    (d as any).screenX -= minX;
    (d as any).screenY -= minY;
  });

  const totalPower = root.descendants().reduce((acc, d) => {
    if (!d.data.item) return acc;

    const recipes = getRecipes(d.data.item.id);

    const machineId =
      getProductionBuilding(props.appConfig, recipes!) ??
      "assembling-machine-1";

    const numberOfMachines = getMachineCount(
      machineId,
      d.data.rate,
      d.data.item,
      props.appConfig.bonuses.mining
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

  props.powerConsumption.current = totalPower;

  const treeNodeMap = new Map<string, any>();

  allNodes.forEach((d: any) => {
    if (d.data.item && d.data.item.id) {
      treeNodeMap.set(d.data.item.id, d);
    }
  });

  const endingTime = Date.now();

  const time = endingTime - startingTime;
  toast.info(`Calculated ${allNodes.length} nodes in ${time}ms.`);

  return (
    <svg className="overflow-visible">
      {root.descendants().map((d, i) => {
        if (!d.data.item) return null;

        const sx = (d as any).screenX;
        const sy = (d as any).screenY;

        const recipes = getRecipes(d.data.item.id);

        const machineId =
          getProductionBuilding(props.appConfig, recipes!) ??
          "assembling-machine-1";

        const numberOfMachines = getMachineCount(
          machineId,
          d.data.rate,
          d.data.item,
          props.appConfig.bonuses.mining
        );

        return (
          <ProductionNode
            key={i}
            appConfig={props.appConfig}
            id={d.data.item.id}
            ratePerSecond={d.data.rate}
            machine={machineId}
            numberOfMachine={numberOfMachines}
            x={sx}
            y={sy}
          />
        );
      })}

      {allEdges.map((link, i) => {
        const s = treeNodeMap.get(link.source);
        const t = treeNodeMap.get(link.target);
        if (!s || !t) {
          console.log(link.value + " is missing s or t");
          return null;
        }

        const sx = s.screenX;
        const sy = s.screenY;

        const tx = t.screenX;
        const ty = t.screenY;

        const sourceX = sx;
        const sourceY = sy + NODE_HEIGHT / 2;

        const targetX = tx + NODE_WIDTH;
        const targetY = ty + NODE_HEIGHT / 2;

        const curveOffset = Math.min(150, Math.abs(sourceX - targetX) * 0.5);

        return (
          <path
            key={i}
            d={`
              M ${sourceX},${sourceY}
              C ${sourceX - curveOffset},${sourceY} 
                ${targetX + curveOffset},${targetY} 
                ${targetX - 40},${targetY}
            `}
            stroke={`rgba(from ${getIconColor(s.data.item.id)} r g b)`}
            fillOpacity={0}
            z={10}
            strokeOpacity={0.1}
            strokeWidth="40"
            style={{ pointerEvents: "none" }}
          />
        );
      })}
    </svg>
  );
}
