import { ItemContainer } from "@/components/item-container";
import { LayoutProps } from "@/components/layout";

type NodeModulesDisplayProps = LayoutProps;

export function NodeModulesDisplay(props: NodeModulesDisplayProps) {
  const modules = Array.from(props.appConfig.production.modules);

  return (
    <div className="flex flex-row gap-4 h-6 w-full">
      {modules.map((v) => {
        if (v[1] !== 0) {
          return (
            <div className="flex flex-row gap-2">
              <p>{v[1]}x</p>
              <ItemContainer key={v[0]} size={20} icon={v[0]} />
            </div>
          );
        }
      })}
    </div>
  );
}
