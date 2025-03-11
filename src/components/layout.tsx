import { AppConfig } from "@/config";
import { Dispatch, SetStateAction, useRef } from "react";
import { ProductionGraphContainer } from "./canvas/production-graph-container";
import { Item, ItemDisplay, Recipe } from "@/types/data";
import { Sidebar } from "./layout/sidebar";
import { AppState } from "@/state";
import { ProductionGraph } from "./canvas/graph/production-graph";
import { Toaster } from "./ui/sonner";

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
        <ProductionGraphContainer
          {...props}
          powerConsumption={powerConsumption}
        >
          <ProductionGraph {...props} powerConsumption={powerConsumption} />
        </ProductionGraphContainer>
        <Toaster visibleToasts={1} position="bottom-left" />
      </div>
    </div>
  );
}
