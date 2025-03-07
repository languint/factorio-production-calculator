import { ItemUnits } from "@/types/units";

export function getUnit(unit: ItemUnits, value: number) {
    if (unit === "hour") {
        return value * 60 * 60;
    } else if (unit === "minute") {
        return value * 60;
    } else {
        return value;
    }
}