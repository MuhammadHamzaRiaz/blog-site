// core
import { forwardRef } from "react";
// icons
import { Loader2Icon } from "lucide-react";

interface LoadMoreTriggerProps {
  isLoading: boolean;
}

const LoadMoreTrigger = forwardRef<HTMLDivElement, LoadMoreTriggerProps>(({ isLoading }, ref) => {
  return (
    <div
      ref={ref}
      className="h-20 flex items-center justify-center mt-6"
      aria-label="Loading more posts"
      role="status"
    >
      {isLoading ? (
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Loader2Icon className="animate-spin" />
          <span className="text-sm">Loading more posts...</span>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Scroll to load more</p>
      )}
    </div>
  );
});

LoadMoreTrigger.displayName = "LoadMoreTrigger";
export default LoadMoreTrigger;
