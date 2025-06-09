// components/layout/Header.tsx
"use client";
// components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-2 ">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Posts</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Avatar className="cursor-pointer">
          <AvatarImage src="/images/avatar_image.avif" className="object-cover"></AvatarImage>
        </Avatar>
      </div>
    </header>
  );
};
export default DashboardHeader;
