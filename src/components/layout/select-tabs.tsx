import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { ItemContainer } from "../item-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { AppConfig } from "@/config";
import { AppState } from "@/state";
import { Item, ItemDisplay, Recipe } from "@/types/data";
import { Dispatch, SetStateAction } from "react";

interface SelectTabsProps {
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
  currentItem: string;
  setCurrentItem: Dispatch<SetStateAction<string>>;
}

export function SelectTabs(props: SelectTabsProps) {
  const logistics = props.recipes.filter(
    (recipe) => (recipe.category as unknown as string) === "logistics"
  );

  const production = props.recipes.filter(
    (recipe) => (recipe.category as unknown as string) === "production"
  );

  const intermediates = props.recipes.filter(
    (recipe) =>
      (recipe.category as unknown as string) === "intermediate-products"
  );

  const combat = props.recipes.filter(
    (recipe) => (recipe.category as unknown as string) === "combat"
  );

  const fluids = props.recipes.filter(
    (recipe) =>
      (recipe.category as unknown as string) === "fluids" &&
      recipe.id !== "heat-exchanger-steam-boil"
  );

  const technology = props.recipes.filter(
    (recipe) => (recipe.category as unknown as string) === "technology"
  );

  return (
    <Tabs defaultValue="logistics" key="logistics">
      <TabsList className="grid w-full grid-cols-6 gap-1">
        <TabsTrigger value="logistics" key="logistics">
          Logistics
        </TabsTrigger>
        <TabsTrigger value="production" key="production">
          Production
        </TabsTrigger>
        <TabsTrigger value="intermediates" key="intermediates">
          Intermediates
        </TabsTrigger>
        <TabsTrigger value="combat" key="combat">
          Combat
        </TabsTrigger>
        <TabsTrigger value="fluids" key="fluids">
          Fluids
        </TabsTrigger>
        <TabsTrigger value="technology" key="technology">
          Technology
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logistics">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {logistics.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="production">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {production.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="intermediates">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {intermediates.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="combat">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {combat.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="fluids">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {fluids.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="technology">
        <Card>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="grid grid-cols-8 gap-2">
                {technology.map((recipe, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="p-1 border aspect-square items-center justify-center flex rounded-sm w-auto h-auto"
                          style={{
                            backgroundColor:
                              props.currentItem === recipe.id
                                ? "var(--secondary)"
                                : "var(--background)",
                            borderColor:
                              props.currentItem === recipe.id
                                ? "var(--ring)"
                                : "var(--border)",
                          }}
                          onClick={() => props.setCurrentItem(recipe.id)}
                        >
                          <ItemContainer
                            icon={recipe.icon}
                            size={32}
                            key={index}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{recipe.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
