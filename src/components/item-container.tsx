import { getIconClip } from "@/types/data";
import { useEffect, useState } from "react";

interface ItemContainerProps {
  icon: string;
  size: number;
  Native?: React.ComponentProps<"div">;
}

export function ItemContainer(props: ItemContainerProps) {
  const [iconClip, setIconClip] = useState<string>();

  const originalIconSize = 64;
  const desiredIconSize = props.size;
  const atlasWidth = 1318;
  const atlasHeight = 1252;
  const scale = desiredIconSize / originalIconSize;

  useEffect(() => {
    const rawClip = getIconClip(props.icon);
    const [rawX, rawY] = rawClip.split(" ");
    const x = parseFloat(rawX);
    const y = parseFloat(rawY);
    const scaledX = x * scale;
    const scaledY = y * scale;
    setIconClip(`${scaledX}px ${scaledY}px`);
  }, [props.icon, scale]);

  return (
    <div
      style={{
        width: desiredIconSize,
        height: desiredIconSize,
        backgroundImage: "url(/icons.webp)",
        backgroundPosition: iconClip,
        backgroundSize: `${atlasWidth * scale}px ${atlasHeight * scale}px`,
      }}
      {...props.Native}
    ></div>
  );
}
