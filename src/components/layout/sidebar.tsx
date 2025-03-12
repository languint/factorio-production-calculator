import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  SidebarProvider,
  SidebarHeader,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  Sidebar as S,
  SidebarFooter,
} from "../ui/sidebar";
import { getItemName } from "@/types/data";
import { ItemContainer } from "../item-container";
import { Switch } from "../ui/switch";
import { getCookie, replacer } from "@/cookies";
import { ModuleSelector } from "./module-selector";
import { LayoutProps } from "../layout";

type SidebarProps = {} & LayoutProps;

export function Sidebar(props: SidebarProps) {
  return (
    <SidebarProvider>
      <S side="right" collapsible="offcanvas" className="w-80">
        <SidebarHeader>
          <SidebarMenuItem className="flex-row flex gap-4 items-center">
            <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
              <img src="/factorio-production-calculator/logo.svg" />
            </div>
            <span className="font-semibold text-sm">
              Factorio Production Calculator
            </span>
          </SidebarMenuItem>
        </SidebarHeader>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Bonuses
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="flex-col flex gap-2 p-2">
                <p className="text-sm text-muted-foreground">
                  Mining Productivity Level
                </p>
                <Input
                  type="number"
                  aria-label="mining-input-bonus"
                  step={1}
                  min={0}
                  defaultValue={0}
                  onChange={(e) => {
                    const value = Number.parseInt(e.currentTarget.value);

                    if (value || value === 0)
                      props.setAppConfig({
                        ...props.appConfig,
                        bonuses: {
                          ...props.appConfig.bonuses,
                          mining: value,
                        },
                      });
                  }}
                />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Display
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="flex-col flex gap-2 p-2">
                <p className="text-sm text-muted-foreground">
                  Display Rate Units
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      {"Units per " + props.appConfig.display.itemUnits}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.itemUnits === "second"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              itemUnits: "second",
                            },
                          });
                      }}
                    >
                      second
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.itemUnits === "minute"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              itemUnits: "minute",
                            },
                          });
                      }}
                    >
                      minute
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.itemUnits === "hour"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              itemUnits: "hour",
                            },
                          });
                      }}
                    >
                      hour
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-sm text-muted-foreground">Power Units</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      {props.appConfig.display.powerUnits}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.powerUnits === "KW"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              powerUnits: "KW",
                            },
                          });
                      }}
                    >
                      KW
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.powerUnits === "MW"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              powerUnits: "MW",
                            },
                          });
                      }}
                    >
                      MW
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={props.appConfig.display.powerUnits === "GW"}
                      onCheckedChange={(c) => {
                        if (c)
                          props.setAppConfig({
                            ...props.appConfig,
                            display: {
                              ...props.appConfig.display,
                              powerUnits: "GW",
                            },
                          });
                      }}
                    >
                      GW
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-sm text-muted-foreground">Show flow</p>
                <Switch
                  onCheckedChange={(checked) => {
                    props.setAppConfig({
                      ...props.appConfig,
                      display: {
                        ...props.appConfig.display,
                        showFlow: checked,
                      },
                    });
                  }}
                  checked={props.appConfig.display.showFlow}
                />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Production
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
          </SidebarGroup>
          <CollapsibleContent>
            <SidebarGroupContent className="flex-col flex gap-2 p-2">
              <p className="text-sm text-muted-foreground">
                Preferred Assembly Machine
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="flex flex-row gap-2">
                    <ItemContainer
                      icon={props.appConfig.production.assembly}
                      size={20}
                    />
                    {getItemName(props.appConfig.production.assembly)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.assembly ===
                      "assembling-machine-1"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            assembly: "assembling-machine-1",
                          },
                        });
                    }}
                  >
                    Assembling machine 1
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.assembly ===
                      "assembling-machine-2"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            assembly: "assembling-machine-2",
                          },
                        });
                    }}
                  >
                    Assembling machine 2
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.assembly ===
                      "assembling-machine-3"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            assembly: "assembling-machine-3",
                          },
                        });
                    }}
                  >
                    Assembling machine 3
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-muted-foreground">Preferred Furnace</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="flex flex-row gap-2">
                    <ItemContainer
                      icon={props.appConfig.production.furnace}
                      size={20}
                    />
                    {getItemName(props.appConfig.production.furnace)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.furnace === "stone-furnace"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            furnace: "stone-furnace",
                          },
                        });
                    }}
                  >
                    Stone Furnace
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.furnace === "steel-furnace"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            furnace: "steel-furnace",
                          },
                        });
                    }}
                  >
                    Steel Furnace
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={
                      props.appConfig.production.furnace === "electric-furnace"
                    }
                    onCheckedChange={(c) => {
                      if (c)
                        props.setAppConfig({
                          ...props.appConfig,
                          production: {
                            ...props.appConfig.production,
                            furnace: "electric-furnace",
                          },
                        });
                    }}
                  >
                    Electric Furnace
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModuleSelector {...props} />
              <p className="text-sm text-muted-foreground">Prefer Refinery</p>
              <Switch
                onCheckedChange={(checked) => {
                  props.setAppConfig({
                    ...props.appConfig,
                    production: {
                      ...props.appConfig.production,
                      preferRefinery: checked,
                    },
                  });
                }}
                checked={props.appConfig.production.preferRefinery}
              />
            </SidebarGroupContent>
          </CollapsibleContent>
        </Collapsible>
        <div className="flex grow" />
        <SidebarFooter>
          <SidebarGroupLabel>Data</SidebarGroupLabel>
          <div className="flex flex-row justify-center gap-2">
            <Button
              variant={"outline"}
              className="flex-grow"
              onClick={() =>
                props.setAppConfig(JSON.parse(getCookie("data") ?? "{}"))
              }
            >
              Load
            </Button>
            <Button
              className="flex-grow"
              onClick={() =>
                (document.cookie = `data=${JSON.stringify(
                  props.appConfig,
                  replacer
                )}`)
              }
            >
              Save
            </Button>
          </div>
        </SidebarFooter>
      </S>
    </SidebarProvider>
  );
}
