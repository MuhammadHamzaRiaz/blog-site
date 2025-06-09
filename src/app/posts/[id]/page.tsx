// core
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// icons
import { CalendarIcon, User2Icon } from "lucide-react";
// utils
import fetchPost from "@/lib/server-api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await fetchPost(id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.body.slice(0, 150),
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await fetchPost(id);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Post could not be loaded.</h2>
        <p className="text-muted-foreground mb-4">
          Try refreshing the page or go back to the posts list.
        </p>
        <Link href="/posts">
          <Button variant="default">Back to Posts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground leading-tight">{post.title}</h1>
        <Link href="/posts">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="flex items-center text-muted-foreground text-sm gap-4">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <User2Icon className="w-4 h-4" />
          <span>Hamza Riaz</span>
        </div>
      </div>

      <Card className="relative w-full h-80 overflow-hidden rounded-2xl">
        <Image
          src="/images/blog_image.jpg"
          alt="Blog cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          fill
          className="object-cover"
          priority
        />
      </Card>

      <div className="text-lg leading-relaxed text-foreground">
        {post.body.split("\n").map((para, idx) => (
          <p key={idx} className="mb-4">
            {para}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
        <span className="text-xs bg-muted px-3 py-1 rounded-full">#React</span>
        <span className="text-xs bg-muted px-3 py-1 rounded-full">#Frontend</span>
        <span className="text-xs bg-muted px-3 py-1 rounded-full">#Performance</span>
      </div>
    </div>
  );
}
