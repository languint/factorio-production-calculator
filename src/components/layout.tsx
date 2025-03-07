import { ChevronDown, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import { AppConfig } from "@/App";
import { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Collapsible } from "./ui/collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface LayoutProps {
  appConfig: AppConfig;
  setAppConfig: Dispatch<SetStateAction<AppConfig>>;
}

export function Layout(props: LayoutProps) {
  return (
    <div className="Layout">
      <SidebarProvider>
        <Sidebar side="right" collapsible="offcanvas">
          <SidebarHeader>
            <SidebarMenuItem className="flex-row flex gap-4 items-center">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Settings className="size-4" />
              </div>
              <span className="font-semibold">Settings</span>
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
                    Mining Productivity Bonus
                  </p>
                  <Input
                    type="number"
                    aria-label="mining-input-bonus"
                    placeholder="0"
                    step={10}
                    onChange={(e) => {
                      const value = Number.parseInt(e.currentTarget.value);
                      if (value && value !== props.appConfig.bonuses.mining) {
                        props.setAppConfig({
                          ...props.appConfig,
                          bonuses: {
                            ...props.appConfig.bonuses,
                            mining: value,
                          },
                        });
                      }
                    }}
                    aria-valuemin={0}
                  />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible defaultOpen className="group/collapsible">
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
                  <p className="text-sm text-muted-foreground">
                    Power Units
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"outline"}>
                        {props.appConfig.display.itemUnits}
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
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
