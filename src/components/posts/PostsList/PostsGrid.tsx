// core
import Link from "next/link";
// component
import PostCard from "../PostCard";
import BlogCardSkeleton from "../PostCardSkeleton";
// interface
import { IPost } from "@/lib/interface";

interface PostsGridProps {
  posts: IPost[];
  isLoadingMore: boolean;
  batchSize: number;
}

const PostsGrid = ({ posts, isLoadingMore, batchSize }: PostsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <PostCard {...post} />
        </Link>
      ))}
      {isLoadingMore &&
        Array.from({ length: batchSize }).map((_, i) => (
          <BlogCardSkeleton key={`loading-skeleton-${i}`} />
        ))}
    </div>
  );
};
export default PostsGrid;
