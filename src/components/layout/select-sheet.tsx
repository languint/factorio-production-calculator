import { AppConfig } from "@/config";
import { AppState } from "@/state";
import { getItem, Item, ItemDisplay, Recipe } from "@/types/data";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Hammer } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { reverseUnit } from "@/util/get-unit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Card, CardContent } from "../ui/card";
import { ItemContainer } from "../item-container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

interface SelectSheetProps {
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

export function SelectSheet(props: SelectSheetProps) {
  const [currentItem, setCurrentItem] = useState<string>("wooden-chest");
  const rateRef = useRef(1);
  const [open, setOpen] = useState(false);

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
    <Drawer open={open}>
      <DrawerTrigger>
        <Button
          className="flex aspect-square size-12 items-center justify-center rounded-lg"
          onClick={() => setOpen(true)}
          asChild
        >
          <Hammer className="size-12" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl h-auto">
          <DrawerHeader>
            <DrawerTitle>Select an item</DrawerTitle>
          </DrawerHeader>
          <div>
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
                                      currentItem === recipe.id
                                        ? "var(--secondary)"
                                        : "var(--background)",
                                    borderColor:
                                      currentItem === recipe.id
                                        ? "var(--ring)"
                                        : "var(--border)",
                                  }}
                                  onClick={() => setCurrentItem(recipe.id)}
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
          </div>
          <DrawerFooter>
            <div className="flex flex-row gap-16">
              <Input
                type="number"
                placeholder={
                  rateRef.current + " per " + props.appConfig.display.itemUnits
                }
                onChange={(e) => {
                  const value = Number.parseInt(e.currentTarget.value);
                  if (value) {
                    rateRef.current = value;
                  }
                }}
              />
              <Button
                className="w-24"
                onClick={() => {
                  props.setAppState({
                    ...props.appState,
                    production: [
                      {
                        item: getItem(currentItem)!,
                        rate: reverseUnit(
                          rateRef.current,
                          props.appConfig.display.itemUnits
                        ),
                      },
                    ],
                  });
                  setOpen(false);
                }}
              >
                Set
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
