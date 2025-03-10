import { Skeleton } from "../ui/skeleton";

export function MobileModal() {
  return (
    <Skeleton
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        zIndex: 100,
      }}
    >
      <img
        src={"/factorio-production-calculator/logo.svg"}
        width={"100%"}
      ></img>
      <p className="text-xl">App is not supported on mobile.</p>
    </Skeleton>
  );
}
