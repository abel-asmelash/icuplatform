import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </section>

      <section className="mt-11">
        <Skeleton className="h-14 w-full rounded-lg" />
      </section>

      <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-28 rounded-lg" />
        ))}
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="mt-2 flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="mt-2 flex gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
