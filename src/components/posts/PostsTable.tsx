"use client";
// core
import { useCallback, useMemo, useState } from "react";
// components 
import { Button } from "@/components/ui/button";
import DeletePostDialog from "./DeletePostDialog";
import EditPostDialog from "./EditPostDialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/components/common/Pagination";
import PostTableRow from "./PostTableRow";
import PostsTableSkeleton from "./PostsTableSkeleton";
// constants
import { TABLE_COLUMNS } from "@/lib/constants";
// hooks 
import { usePagination } from "@/hooks/usePagination";
import { usePosts } from "@/hooks/usePosts";
// icons 
import { Plus } from "lucide-react";
// interface 
import { IPost, ILoadingState } from "@/lib/interface";
// toast 
import { toast } from "sonner";

const PostsTable = () => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewPostDialog, setNewPostDialog] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);

  const [loadingStates, setLoadingStates] = useState<ILoadingState>({
    update: false,
    delete: false,
    create: false,
  });

  const { postsQuery, updatePost, deletePost, createPost } = usePosts();

  const posts = useMemo(() => postsQuery.data ?? [], [postsQuery.data]);

  const pagination = usePagination({
    totalItems: posts.length,
    initialPage: 1,
    itemsPerPage: 20,
  });

  const paginatedPosts: IPost[] = useMemo(
    () => pagination.getPageItems(posts),
    [pagination, posts]
  );

  const handleDeletePostDialog = useCallback((post: IPost) => {
    setSelectedPost(post);
    setOpenDeletePost(true);
  }, []);

  const onDeletePost = useCallback(
    async (id: number) => {
      setLoadingStates((prev) => ({ ...prev, delete: true }));

      try {
        await deletePost.mutateAsync(id);
        toast.success("Post deleted", {
          description: "The post has been permanently removed.",
        });
        setOpenDeletePost(false);
        setSelectedPost(null);
      } catch (error) {
        console.error("Delete post error:", error);
        toast.error("Failed to delete post", {
          description: "An error occurred while deleting the post.",
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, delete: false }));
      }
    },
    [deletePost]
  );

  const handleEditPostDialog = useCallback((post: IPost) => {
    setSelectedPost(post);
    setOpenEditDialog(true);
  }, []);

  const onUpdatePost = useCallback(
    async (id: number, title: string, body: string) => {
      setLoadingStates((prev) => ({ ...prev, update: true }));
      try {
        await updatePost.mutateAsync({
          id,
          data: { title, body },
        });
        toast.success("Post updated", {
          description: "Changes have been saved successfully.",
        });
        setSelectedPost(null);
        setOpenEditDialog(false);
      } catch (error) {
        console.error("Update post error:", error);
        toast.error("Failed to update post", {
          description: "Couldn't save changes. Try again later.",
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, update: false }));
      }
    },
    [updatePost]
  );

  const handleNewPostDialog = useCallback(() => {
    setNewPostDialog(true);
  }, []);

  const onCreatePost = useCallback(
    async (title: string, body: string) => {
      setLoadingStates((prev) => ({ ...prev, create: true }));

      try {
        await createPost.mutateAsync({ title, body });
        toast.success("Post created", {
          description: "Your new post has been published.",
        });
        setNewPostDialog(false);
      } catch (error) {
        console.error("Create post error:", error);
        toast.error("Failed to create post", {
          description: "Please try again or check your input.",
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, create: false }));
      }
    },
    [createPost]
  );

  const handleCloseEdit = useCallback(() => {
    setOpenEditDialog(false);
    setSelectedPost(null);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setOpenDeletePost(false);
    setSelectedPost(null);
  }, []);

  const handleCloseNew = useCallback(() => {
    setNewPostDialog(false);
  }, []);

  if (postsQuery.isPending) return <PostsTableSkeleton />;

  if (postsQuery.isError) {
    return (
      <div className="border rounded-lg p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load posts</p>
          <Button
            variant="outline"
            onClick={() => postsQuery.refetch()}
            disabled={postsQuery.isFetching}
          >
            {postsQuery.isFetching ? "Retrying..." : "Try Again"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg gap-2 p-3 flex flex-col max-h-[calc(100vh-86px)] overflow-hidden">
      <div className="px-3 flex justify-between items-center">
        <div className="text-xl font-medium text-black dark:text-white">Blog Posts</div>
        <Button variant="outline" onClick={handleNewPostDialog}>
          <Plus className="w-4 h-4 mr-1" />
          New Post
        </Button>
      </div>

      <div className="overflow-auto flex-1">
        <Table className="border-separate">
          <TableHeader>
            <TableRow className="bg-muted">
              {TABLE_COLUMNS.map((column) => (
                <TableHead key={column.id} className={`px-3 ${column.classes}`}>
                  {column.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPosts.length === 0 ? (
              <TableRow>
                <td
                  colSpan={TABLE_COLUMNS.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No posts found. Create your first post to get started.
                </td>
              </TableRow>
            ) : (
              paginatedPosts.map((post: IPost, index: number) => {
                const displayIndex =
                  (pagination.currentPage - 1) * pagination.itemsPerPage + index + 1;

                return (
                  <PostTableRow
                    key={post.id}
                    index={displayIndex}
                    title={post.title}
                    body={post.body}
                    onDelete={() => handleDeletePostDialog(post)}
                    onEdit={() => handleEditPostDialog(post)}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-3">
        <TablePagination
          pagination={pagination}
          showPageSizeSelector
          showInfo
          showFirstLast
          showGoToFirst
          showGoToLast
          variant="outline"
        />
      </div>
      <EditPostDialog
        open={openNewPostDialog}
        setOpen={handleCloseNew}
        onSubmit={(val) => onCreatePost(val.title, val.body)}
        submitLoading={loadingStates.create}
        mode="create"
      />
      {selectedPost && (
        <EditPostDialog
          initialData={selectedPost}
          onSubmit={(val) => onUpdatePost(selectedPost.id, val.title, val.body)}
          submitLoading={loadingStates.update}
          open={openEditDialog}
          setOpen={handleCloseEdit}
          onClose={handleCloseEdit}
          mode="edit"
        />
      )}
      {selectedPost && (
        <DeletePostDialog
          open={openDeletePost}
          setOpen={handleCloseDelete}
          onClose={handleCloseDelete}
          onSubmit={() => onDeletePost(selectedPost.id)}
          submitLoading={loadingStates.delete}
        />
      )}
    </div>
  );
};

export default PostsTable;
