import { useEffect, useState } from "react";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./components/theme-provider";
import {
  Item,
  ItemDisplay,
  loadIcons,
  loadItems,
  loadRecipes,
  Recipe,
} from "./types/data";
import "./App.css";
import { AppConfig, defaultConfig } from "./config";
import { LoadingModal } from "./components/layout/loading-modal";
import { AppState, defaultAppState } from "./state";

function App() {
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultConfig);
  const [appState, setAppState] = useState<AppState>(defaultAppState);
  const [items, setItems] = useState<Item[]>([]);
  const [icons, setIcons] = useState<ItemDisplay[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setItems(loadItems);
    setIcons(loadIcons);
    setRecipes(loadRecipes);
    setIsLoading(false);
  }, []);

  console.log(`Loaded: ${items!.length} items.`);
  console.log(`Loaded: ${icons!.length} icons.`);
  console.log(`Loaded: ${recipes.length} recipes.`);

  return (
    <ThemeProvider defaultTheme="dark">
      {isLoading && <LoadingModal />}
      <Layout
        appConfig={appConfig}
        setAppConfig={setAppConfig}
        appState={appState}
        setAppState={setAppState}
        icons={icons}
        setIcons={setIcons}
        items={items}
        setItems={setItems}
        recipes={recipes}
        setRecipes={setRecipes}
      />
    </ThemeProvider>
  );
}

export default App;
