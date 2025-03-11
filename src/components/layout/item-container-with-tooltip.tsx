import {
  TooltipTrigger,
  TooltipProvider,
  Tooltip,
  TooltipContent,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { ItemContainer } from "../item-container";
import { Recipe } from "@/types/data";

interface ItemContainerWithTooltipProps {
  recipe: Recipe;
  currentItem: string;
  index: number;
  onClick: () => void;
  text?: string;
}

export function ItemContainerWithTooltip(props: ItemContainerWithTooltipProps) {
  const { recipe, currentItem, index, onClick, text } = props;

  return (
    <TooltipProvider>
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
                currentItem === recipe.id ? "var(--ring)" : "var(--border)",
            }}
            onClick={onClick}
          >
            <ItemContainer icon={recipe.icon} size={32} key={index} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text ?? recipe.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
