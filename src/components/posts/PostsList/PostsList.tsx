"use client";
// core
import { useState, useMemo, useCallback } from "react";
// components
import PostsGrid from "./PostsGrid";
import LoadMoreTrigger from "./LoadMoreTrigger";
import { EmptyState, EndMessage, ErrorState, LoadingState } from "./StateUi";
// hooks
import { usePosts } from "@/hooks/usePosts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const BATCH_SIZE = 6;
const LOADING_DELAY = 3000;

export default function PostsList() {
  const { postsQuery } = usePosts();
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allPosts = useMemo(() => postsQuery.data || [], [postsQuery.data]);
  const hasMore = visibleCount < allPosts.length;

  const visiblePosts = useMemo(() => {
    return allPosts.slice(0, visibleCount);
  }, [allPosts, visibleCount]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, allPosts.length));
      setIsLoadingMore(false);
    }, LOADING_DELAY);
  }, [isLoadingMore, allPosts.length]);

  const { loadMoreRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore || postsQuery.isPending,
    onLoadMore: handleLoadMore,
    threshold: 0.8,
    rootMargin: "50px",
  });

  if (postsQuery.isPending && visibleCount === BATCH_SIZE) {
    return <LoadingState />;
  }

  if (postsQuery.isError) {
    return <ErrorState onRetry={() => postsQuery.refetch()} />;
  }

  if (!postsQuery.isPending && allPosts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <PostsGrid posts={visiblePosts} isLoadingMore={isLoadingMore} batchSize={BATCH_SIZE} />

      {hasMore && <LoadMoreTrigger ref={loadMoreRef} isLoading={isLoadingMore} />}

      {!hasMore && allPosts.length > 0 && <EndMessage totalCount={allPosts.length} />}
    </div>
  );
}
