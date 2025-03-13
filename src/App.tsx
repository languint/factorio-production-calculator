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
import { useIsMobile } from "./hooks/use-mobile";
import { MobileModal } from "./components/layout/mobile-modal";
import { getCookie, reviver } from "./cookies";

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
    setTimeout(() => setIsLoading(false), import.meta.env.DEV ? 0 : 2000);
    if (Object.keys(JSON.parse(getCookie("data") ?? "{}")).length !== 0) {
      setAppConfig(JSON.parse(getCookie("data") ?? "{}", reviver));
    }
  }, []);

  console.log(`Loaded: ${items!.length} items.`);
  console.log(`Loaded: ${icons!.length} icons.`);
  console.log(`Loaded: ${recipes.length} recipes.`);

  return (
    <ThemeProvider defaultTheme="dark">
      {useIsMobile() && <MobileModal />}
      {isLoading && <LoadingModal />}
      {!useIsMobile() && (
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
      )}
    </ThemeProvider>
  );
}

export default App;
