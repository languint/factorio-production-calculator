import { Skeleton } from "../ui/skeleton";

export function LoadingModal() {
  return (
    <Skeleton
      style={{
        position: "fixed",
        inset: 0,
        width: "calc(100% - 15rem)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        zIndex: 1000,
      }}
    >
      <p className="text-2xl">Loading...</p>
    </Skeleton>
  );
}
