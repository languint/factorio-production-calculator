import { AppConfig } from "@/config";
import { AppState } from "@/state";
import { getItem, Item, ItemDisplay, Recipe } from "@/types/data";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";

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

  useEffect(() => {
    setOpen(props.appState.productionPanelOpen);
  }, [props.appState.productionPanelOpen]);

  return (
    <Tooltip>
      <Drawer open={open}>
        <TooltipTrigger asChild>
          <DrawerTrigger>
            <Button
              className={`flex aspect-square size-12 items-center justify-center rounded-lg`}
              onClick={() => setOpen(true)}
              asChild
            >
              <div className="">
                {props.appState.production.length === 0 && (
                  <Skeleton className="w-full h-full absolute size-12 z-10 bg-green-500" />
                )}
                <Hammer className="z-20" />
              </div>
            </Button>
          </DrawerTrigger>
        </TooltipTrigger>
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
                    rateRef.current +
                    " per " +
                    props.appConfig.display.itemUnits
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
        <TooltipContent side="left">
          <p>Add Items</p>
        </TooltipContent>
      </Drawer>
    </Tooltip>
  );
}
