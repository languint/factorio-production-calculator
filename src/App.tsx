import { useEffect, useMemo, useState } from "react";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import { AssemblyBuildings, FurnaceBuildings } from "./types/buildings";
import { LogisticsBelt } from "./types/logistics";
import { ItemRateUnit, PowerUnit } from "./types/units";
import { Item, loadItemsFromFile } from "./types/data";
import "./App.css";

export interface AppConfig {
  bonuses: {
    mining: number;
  };
  logistics: {
    belt: LogisticsBelt;
  };
  production: {
    furnace: FurnaceBuildings;
    assembly: AssemblyBuildings;
  };
  display: {
    itemUnits: ItemRateUnit;
    powerUnits: PowerUnit;
  };
}

const defaultConfig = {
  bonuses: {
    mining: 0,
  },
  logistics: {
    belt: "transport-belt",
  },
  production: {
    furnace: "stone-furnace",
    assembly: "assembling-machine-1",
  },
  display: {
    itemUnits: "minute",
    powerUnits: "MW",
  },
} as AppConfig;

function App() {
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultConfig);

  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    loadItemsFromFile("/src/data/data.json").then((items) => setItems(items));
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <Layout appConfig={appConfig} setAppConfig={setAppConfig} />
    </ThemeProvider>
  );
}

export default App;
