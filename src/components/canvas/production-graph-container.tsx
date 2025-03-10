import React, {
  useRef,
  useEffect,
  ReactNode,
  RefObject,
  useState,
} from "react";
import { SelectSheet } from "../layout/select-sheet";
import { LayoutProps } from "../layout";
import { Button } from "../ui/button";
import { Focus, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getPowerUnit } from "@/util/get-unit";

type Props = {
  children?: ReactNode | ReactNode[];
  powerConsumption: RefObject<number>;
} & LayoutProps;

export function ProductionGraphContainer(props: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef(null);

  const scaleRef = useRef(1);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const initializedRef = useRef(false);

  const [power, setPower] = useState(props.powerConsumption.current);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (props.powerConsumption.current !== power) {
        setPower(props.powerConsumption.current);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.powerConsumption, power]);

  const clampScale = (newScale: number) => Math.max(0.1, Math.min(newScale, 3));

  const applyTransformations = () => {
    const svg = svgRef.current as SVGElement | undefined;
    if (!svg) return;
    const { clientWidth, clientHeight } = svg;
    svg.setAttribute(
      "viewBox",
      `${-offsetXRef.current} ${-offsetYRef.current} ${
        clientWidth / scaleRef.current
      } ${clientHeight / scaleRef.current}`
    );
  };

  const resizeSVG = () => {
    if (svgRef.current && containerRef.current) {
      const containerWidth = (containerRef.current as HTMLDivElement)
        .clientWidth;
      const containerHeight = (containerRef.current as HTMLDivElement)
        .clientHeight;
      svgRef.current.setAttribute("width", containerWidth.toString());
      svgRef.current.setAttribute("height", containerHeight.toString());

      if (!initializedRef.current) {
        svgRef.current.setAttribute(
          "viewBox",
          `0 0 ${containerWidth} ${containerHeight}`
        );
        offsetXRef.current = 0;
        offsetYRef.current = 0;
        initializedRef.current = true;
      } else {
        applyTransformations();
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const zoomFactor = 0.1;
    const zoom = e.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;
    const newScale = clampScale(scaleRef.current * zoom);
    scaleRef.current = newScale;
    applyTransformations();
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    const dy = e.clientY - lastYRef.current;
    offsetXRef.current += dx;
    offsetYRef.current += dy;
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    applyTransformations();
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastXRef.current = e.touches[0].clientX;
      lastYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastXRef.current;
    const dy = e.touches[0].clientY - lastYRef.current;
    offsetXRef.current += dx;
    offsetYRef.current += dy;
    lastXRef.current = e.touches[0].clientX;
    lastYRef.current = e.touches[0].clientY;
    applyTransformations();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const dx = 40;
    const dy = 40;

    if (e.key === "e") {
      props.setAppState({
        ...props.appState,
        electricityPanelOpen: !props.appState.electricityPanelOpen,
      });
    }

    if (e.key === "ArrowDown") {
      if (e.ctrlKey) {
        scaleRef.current -= 0.1;
      } else {
        offsetYRef.current += dy;
      }
    } else if (e.key === "ArrowUp") {
      if (e.ctrlKey) {
        scaleRef.current += 0.1;
      } else {
        offsetYRef.current -= dy;
      }
    } else if (e.key === "ArrowLeft") {
      offsetXRef.current -= dx;
    } else if (e.key === "ArrowRight") {
      offsetXRef.current += dx;
    }

    applyTransformations();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      resizeSVG();
    });
    resizeObserver.observe(container);

    resizeSVG();

    document.addEventListener("keydown", handleKeydown);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
        backgroundColor: "var(--secondary)",
      }}
    >
      <div className="absolute w-14 h-full right-64 flex flex-col items-center gap-2 justify-center border-0">
        <div className="flex flex-col gap-2 items-center absolute bg-neutral-900 p-2 justify-center border-card border rounded-md">
          <Dialog
            open={props.appState.electricityPanelOpen}
            onOpenChange={(open) =>
              props.setAppState({
                ...props.appState,
                electricityPanelOpen: open,
              })
            }
          >
            <DialogTrigger>
              <Button
                className="flex aspect-square size-12 items-center justify-center rounded-lg"
                variant={"secondary"}
                onClick={() =>
                  props.setAppState({
                    ...props.appState,
                    electricityPanelOpen: true,
                  })
                }
                asChild
              >
                <Zap className="size-12" fill="" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Power Statistics</DialogTitle>
                <DialogDescription>
                  Approximately how much power your build will consume. <br />
                  This is found with the power consumption of each building
                  times by how many of that building you need.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="text-2xl">
                  {getPowerUnit(
                    props.appConfig.display.powerUnits,
                    power
                  )?.toFixed(2) +
                    " " +
                    props.appConfig.display.powerUnits}
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <SelectSheet {...props} />
          <Button
            className="flex aspect-square size-12 items-center justify-center rounded-lg"
            variant={"secondary"}
            asChild
            onClick={() => {
              offsetXRef.current = 0;
              offsetYRef.current = 0;
              applyTransformations();
            }}
          >
            <Focus className="size-12" fill="" />
          </Button>
        </div>
      </div>

      <svg
        ref={svgRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          <pattern
            id="background-pattern"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
          >
            <circle cx="2" cy="2" r="1" fill="var(--ring)" />
          </pattern>
        </defs>
        <rect
          x="-100000"
          y="-100000"
          width="200000"
          height="200000"
          fill="url(#background-pattern)"
        />
        <g id="content" className="z-10 overflow-visible w-full h-full">
          {props.children}
        </g>
      </svg>
    </div>
  );
}
