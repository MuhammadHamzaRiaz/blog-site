import BlogCardSkeleton from "../PostCardSkeleton";

const BATCH_SIZE = 6;

export function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
      {Array.from({ length: BATCH_SIZE }).map((_, i) => (
        <BlogCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="pt-20 text-center">
      <p className="text-red-500 mb-4">Error loading posts. Try again later.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Retry
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center pt-20">
      <p className="text-muted-foreground">No posts found.</p>
    </div>
  );
}

interface EndMessageProps {
  totalCount: number;
}

export function EndMessage({ totalCount }: EndMessageProps) {
  return (
    <div className="text-center mt-8 py-6">
      <p className="text-muted-foreground text-sm">
        You&apos;ve reached the end. Showing all {totalCount} posts.
      </p>
    </div>
  );
}
