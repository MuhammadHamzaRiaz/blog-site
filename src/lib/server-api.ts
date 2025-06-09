import { IPost } from "@/lib/interface";

const fetchPost = async (id: string): Promise<IPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("[fetchPost] Failed to fetch post:", error);
    return null;
  }
};

export default fetchPost;
