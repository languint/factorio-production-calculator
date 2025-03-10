import { ItemRateUnit, PowerUnit } from "@/types/units";

export function getUnit(unit: ItemRateUnit, value: number) {
  if (unit === "hour") {
    return value * 60 * 60;
  } else if (unit === "minute") {
    return value * 60;
  } else {
    return value;
  }
}

export function reverseUnit(value: number, unit: ItemRateUnit) {
  if (unit === "hour") {
    return value / (60 * 60);
  } else if (unit === "minute") {
    return value / 60;
  } else {
    return value;
  }
}

export function getPowerUnit(unit: PowerUnit, kilowatts: number) {
  if (unit === "KW") return kilowatts;
  if (unit === "MW") return kilowatts / 1000;
  if (unit === "GW") return kilowatts / 1000 / 1000;
}