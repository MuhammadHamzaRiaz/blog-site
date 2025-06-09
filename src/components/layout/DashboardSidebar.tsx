"use client";
// core
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// component
import { Button } from "../ui/button";
// constants
import { DASHBOARD_NAV_ITEMS } from "@/lib/constants";
// icons
import * as Icons from "lucide-react";
// theme
import { useTheme } from "next-themes";
// utils
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-64 border-r px-4 py-4 shadow-sm flex flex-col gap-6">
      <Link href="/" className="block h-14">
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

      <nav className="space-y-2">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const Icon = Icons[item.icon] as React.ElementType;
          const isActive = pathname === item.link;

          const activeStyles = isActive
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground";

          const buttonClasses = cn(
            "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors justify-start",
            activeStyles,
            item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          );

          if (item.disabled) {
            return (
              <div key={item.id} className="block">
                <Button variant="ghost" disabled className={buttonClasses}>
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Button>
              </div>
            );
          }

          return (
            <Link key={item.id} href={item.link} className="block">
              <Button variant="ghost" className={buttonClasses}>
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
export default DashboardSidebar;
