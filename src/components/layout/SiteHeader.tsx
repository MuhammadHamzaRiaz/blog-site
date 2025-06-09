"use client";

// core
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// components
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
// theme
import { useTheme } from "next-themes";
// utils
import { cn } from "@/lib/utils";
// constants
import { SITE_NAV_LINKS } from "@/lib/constants";

const SiteHeader = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-20 backdrop-blur-xl py-3">
      <Link href="/" className="w-32 h-10">
        {mounted && (
          <Image
            src={`/images/${theme === "light" ? "light_logo" : "dark_logo"}.svg`}
            width={140}
            height={140}
            alt="Site logo"
            priority
          />
        )}
      </Link>
      <nav className="flex items-center gap-2">
        <ThemeToggle />
        {SITE_NAV_LINKS.map((nav) => {
          const isDisabled = nav.disabled;

          const buttonClasses = cn(
            "text-sm font-medium transition-colors px-4 py-2",
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
          );

          if (isDisabled) {
            return (
              <Button key={nav.id} variant="ghost" disabled className={buttonClasses}>
                {nav.name}
              </Button>
            );
          }

          return (
            <Link key={nav.id} href={nav.link}>
              <Button variant="ghost" className={buttonClasses}>
                {nav.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default SiteHeader;
