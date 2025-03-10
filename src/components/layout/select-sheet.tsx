import { AppConfig } from "@/config";
import { AppState } from "@/state";
import { getItem, Item, ItemDisplay, Recipe } from "@/types/data";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Hammer } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { reverseUnit } from "@/util/get-unit";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { SelectTabs } from "./select-tabs";

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
  const setOpen = (v: boolean) => {
    props.setAppState({
      ...props.appState,
      productionPanelOpen: v,
    });
  };

  return (
    <Drawer open={props.appState.productionPanelOpen}>
      <DrawerTrigger>
        <Button
          className="flex aspect-square size-12 items-center justify-center rounded-lg"
          onClick={() => setOpen(true)}
          asChild
        >
          <Hammer className="size-12" />
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="Select an item">
        <div className="mx-auto w-full max-w-xl h-auto">
          <DrawerHeader>
            <DrawerTitle>Select an item</DrawerTitle>
          </DrawerHeader>
          <div>
            <SelectTabs
              {...props}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
            />
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
