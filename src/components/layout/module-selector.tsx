import { useState } from "react";
import { LayoutProps } from "../layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ItemContainerWithTooltip } from "./item-container-with-tooltip";
import { getRecipe } from "@/types/data";
import { Modules } from "@/types/modules";
import { toast } from "sonner";

type ModuleSelectorProps = {} & LayoutProps;

type ModuleNumberInputProps = {
  enabled: boolean;
  max: number;
  Native?: React.ComponentProps<"input">;
};

export function ModuleNumberInput(props: ModuleNumberInputProps) {
  return (
    <Input
      className="h-[42px] flex-grow"
      type="number"
      disabled={!props.enabled}
      step={1}
      min={0}
      placeholder="0"
      max={props.max}
      {...props.Native}
    />
  );
}

export function ModuleSelector(props: ModuleSelectorProps) {
  const [selectedSpeedModule, setSelectedSpeedModule] =
    useState<Modules>("speed-module");
  const [selectedEfficiencyModule, setSelectedEfficiencyModule] =
    useState<Modules>("efficiency-module");
  const [selectedProductivityModule, setSelectedProductivityModule] =
    useState<Modules>("productivity-module");

  const [speedNumber, setSpeedNumber] = useState(0);
  const [effNumber, setEffNumber] = useState(0);
  const [prodNumber, setProdNumber] = useState(0);

  const canSubmitValue = () => {
    return speedNumber + effNumber + prodNumber <= 4;
  };

  const constructModules = () => {
    const modules = new Map<Modules, number>();

    modules.set(selectedSpeedModule, speedNumber);
    modules.set(selectedEfficiencyModule, effNumber);
    modules.set(selectedProductivityModule, prodNumber);

    return modules;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
        <CardDescription>You may mix and match 4 modules.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row justify-between gap-2">
          <ItemContainerWithTooltip
            currentItem={selectedSpeedModule as string}
            recipe={getRecipe("speed-module")!}
            onClick={() => {
              setSelectedSpeedModule("speed-module");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedSpeedModule as string}
            recipe={getRecipe("speed-module-2")!}
            onClick={() => {
              setSelectedSpeedModule("speed-module-2");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedSpeedModule as string}
            recipe={getRecipe("speed-module-3")!}
            onClick={() => {
              setSelectedSpeedModule("speed-module-3");
            }}
            index={0}
          />
          <ModuleNumberInput
            enabled
            max={4}
            Native={{
              onChange: (e) => {
                e.preventDefault();
                const value = e.currentTarget.value;

                if (parseInt(value)) {
                  setSpeedNumber(parseInt(value));
                }
              },
            }}
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <ItemContainerWithTooltip
            currentItem={selectedEfficiencyModule as string}
            recipe={getRecipe("efficiency-module")!}
            onClick={() => {
              setSelectedEfficiencyModule("efficiency-module");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedEfficiencyModule as string}
            recipe={getRecipe("efficiency-module-2")!}
            onClick={() => {
              setSelectedEfficiencyModule("efficiency-module-2");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedEfficiencyModule as string}
            recipe={getRecipe("efficiency-module-3")!}
            onClick={() => {
              setSelectedEfficiencyModule("efficiency-module-3");
            }}
            index={0}
          />
          <ModuleNumberInput
            enabled
            max={4}
            Native={{
              onChange: (e) => {
                e.preventDefault();
                const value = e.currentTarget.value;

                if (parseInt(value)) {
                  setEffNumber(parseInt(value));
                }
              },
            }}
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <ItemContainerWithTooltip
            currentItem={selectedProductivityModule as string}
            recipe={getRecipe("productivity-module")!}
            onClick={() => {
              setSelectedProductivityModule("productivity-module");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedProductivityModule as string}
            recipe={getRecipe("productivity-module-2")!}
            onClick={() => {
              setSelectedProductivityModule("productivity-module-2");
            }}
            index={0}
          />
          <ItemContainerWithTooltip
            currentItem={selectedProductivityModule as string}
            recipe={getRecipe("productivity-module-3")!}
            onClick={() => {
              setSelectedProductivityModule("productivity-module-3");
            }}
            index={0}
          />
          <ModuleNumberInput
            enabled
            max={4}
            Native={{
              onChange: (e) => {
                e.preventDefault();
                const value = e.currentTarget.value;

                if (parseInt(value)) {
                  setProdNumber(parseInt(value));
                }
              },
            }}
          />
        </div>
        <Button
          onClick={() => {
            if (!canSubmitValue()) {
              toast.warning(
                `Could not apply changes to modules, you may only have at most 4!`
              );
              return;
            }

            props.setAppConfig({
              ...props.appConfig,
              production: {
                ...props.appConfig.production,
                modules: constructModules(),
              },
            });

            toast.info(`Applied changes to modules.`);
          }}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
}
