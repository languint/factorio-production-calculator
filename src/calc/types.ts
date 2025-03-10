import { AssemblyBuildings, FurnaceBuildings } from "@/types/buildings";
import { Item } from "@/types/data"

export type ProductionLine = {
    item: Item;
    rate: number;
}

export type Node = {
    item: Item;
    rate: number;
    machine: AssemblyBuildings | FurnaceBuildings | string;
    children?: Node[];
    parent?: Node;
}