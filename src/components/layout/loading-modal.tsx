export function LoadingModal() {
  return (
    <div className="w-full h-full z-1000 flex flex-col justify-center items-center absolute bg-background gap-4">
      <img src={"/factorio-production-calculator/logo.svg"} />
      <p className="text-4xl ">Loading...</p>
    </div>
  );
}
