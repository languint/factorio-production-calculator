import { AppConfig } from "@/config";
import { Dispatch, SetStateAction, useRef } from "react";
import { PannableZoomableSVG } from "./canvas/pannable-zoomable-canvas";
import { Item, ItemDisplay, Recipe } from "@/types/data";
import { Sidebar } from "./layout/sidebar";
import { AppState } from "@/state";
import { ProductionGraph } from "./canvas/production-graph";

export interface LayoutProps {
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
}

export function Layout(props: LayoutProps) {
  const powerConsumption = useRef(0);

  return (
    <div className="Layout">
      <Sidebar {...props} />
      <div className="w-full h-full absolute bottom-0">
        <PannableZoomableSVG {...props} powerConsumption={powerConsumption}>
          <ProductionGraph
            {...props}
            powerConsumption={powerConsumption}
          ></ProductionGraph>
        </PannableZoomableSVG>
      </div>
    </div>
  );
}
