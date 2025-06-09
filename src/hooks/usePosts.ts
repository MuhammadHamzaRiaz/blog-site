import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as postsService from "@/services/posts/postsService";

export function usePosts() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getPosts,
  });
  const createPost = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) =>
      postsService.createPost({ title, body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title: string; body: string } }) =>
      postsService.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => postsService.deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  return {
    postsQuery,
    createPost,
    updatePost,
    deletePost,
  };
}
