import Image from "next/image";
// components
import { Card, CardContent } from "@/components/ui/card";
// constants
import { TAGS } from "@/lib/constants";
// icons
import { CalendarIcon, User2Icon } from "lucide-react";
// interface
import { IPost } from "@/lib/interface";

const BlogCard = ({ title, body }: IPost) => {
  return (
    <Card className="overflow-hidden border border-border bg-background pt-0 hover:shadow-lg transition-shadow duration-300 rounded-2xl w-full max-w-md">
      <div className="relative w-full h-48">
        <Image
          src="/images/blog_image.jpg"
          alt="Blog cover image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center text-sm text-muted-foreground gap-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" aria-hidden="true" />
            <span>June 8, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <User2Icon className="w-4 h-4" aria-hidden="true" />
            <span>Hamza Riaz</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{body}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
