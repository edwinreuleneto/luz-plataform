// Components
import { Skeleton } from "@/components/ui/skeleton";

const ClientProfileSkeleton = () => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-1 h-4 w-64" />
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-white/10"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-4 w-40" />
            </div>
          ))}
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-4 w-full" />
          </div>
          {Array.from({ length: 2 }).map((_, listIndex) => (
            <div
              key={`list-${listIndex}`}
              className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10"
            >
              <Skeleton className="h-4 w-32" />
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-100 rounded-md border border-gray-200 dark:divide-white/5 dark:border-white/10"
              >
                {Array.from({ length: 2 }).map((_, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-center justify-between py-4 pr-5 pl-4"
                  >
                    <div className="flex w-0 flex-1 items-center">
                      <Skeleton className="size-5 shrink-0 rounded-full" />
                      <Skeleton className="ml-4 h-4 w-40" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default ClientProfileSkeleton;
