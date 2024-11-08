export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="min-h-screen flex items-center justify-center font-sans text-black dark:text-white bg-white dark:bg-black">
        <div>
          <h1 className="inline-block text-2xl font-medium leading-[49px] mr-5 pr-6 border-r border-black/30 dark:border-white/30">
            404
          </h1>
          <div className="inline-block">
            <h2 className="text-sm font-normal leading-[49px] m-0">
              This page could not be found.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
