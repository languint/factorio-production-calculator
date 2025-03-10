import { getIconColor, getItemName } from "@/types/data";
import { ItemContainer } from "../item-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AppConfig } from "@/config";
import { getUnit } from "@/util/get-unit";
import { X } from "lucide-react";

interface ProductionNodeProps {
  appConfig: AppConfig;
  id: string;
  ratePerSecond: number;
  machine: string;
  numberOfMachine: number | string;
  x: number;
  y: number;
  closeVisible?: boolean;
  onCloseClick?: () => void;
}

export function ProductionNode(props: ProductionNodeProps) {
  return (
    <foreignObject
      className="w-80 h-30 overflow-visible"
      style={{ pointerEvents: "none" }}
      x={props.x}
      y={props.y}
      z={40}
    >
      <Card
        className={`w-80 h-30 light:bg-${getIconColor(props.id)} `}
        style={{
          backgroundColor: `rgb(from ${getIconColor(props.id)} r g b / 0.5)`,
          borderColor: `${getIconColor(props.id)}`,
          border: "line",
          padding: 8,
        }}
      >
        <CardHeader className="flex flex-row px-2 justify-between">
          <div className="flex flex-row gap-2 select-none">
            <div className="h-10">
              <CardTitle>{getItemName(props.id)}</CardTitle>
              <p className="text-muted-foreground select-none">
                (
                {getUnit(
                  props.appConfig.display.itemUnits,
                  props.ratePerSecond
                ).toFixed(2)}{" "}
                per {props.appConfig.display.itemUnits})
              </p>
            </div>
            <ItemContainer icon={props.id} size={40} />
          </div>
          <X
            size={16}
            stroke="var(--accent-foreground)"
            visibility={props.closeVisible ? "visible" : "hidden"}
            onClick={props.onCloseClick}
          />
        </CardHeader>
        <CardContent className="flex flex-row gap-4 px-2 items-center select-none">
          <p>{props.numberOfMachine}</p>
          <ItemContainer icon={props.machine} size={20} />
          <p className="">{getItemName(props.machine)}</p>
        </CardContent>
      </Card>
    </foreignObject>
  );
}
