// instance 
import { axiosInstance } from "@/lib/axiosInstance";
// interface 
import { IPost } from "@/lib/interface";

export const getPosts = (): Promise<IPost[]> => axiosInstance.get("/posts").then((res) => res.data);

export const getPost = (id: number): Promise<IPost> =>
  axiosInstance.get(`/posts/${id}`).then((res) => res.data);

export const createPost = (data: { title: string; body: string }): Promise<IPost> =>
  axiosInstance.post("/posts", data).then((res) => res.data);

export const updatePost = (id: number, data: { title: string; body: string }): Promise<IPost> =>
  axiosInstance.put(`/posts/${id}`, data).then((res) => res.data);

export const deletePost = (id: number): Promise<void> =>
  axiosInstance.delete(`/posts/${id}`).then((res) => res.data);
