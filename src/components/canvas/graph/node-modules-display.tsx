import { LayoutProps } from "@/components/layout"

type NodeModulesDisplayProps = LayoutProps;

export function NodeModulesDisplay(props: NodeModulesDisplayProps) {
    return (
        <div className="flex flex-row gap-1">
            {props.appConfig.production.modules.forEach((name, number))}
        </div>
    )
}