import { IDashboardNavItem, ISiteNavItem, ITableColumn } from "./interface";

export const TABLE_COLUMNS: readonly ITableColumn[] = [
  { id: 1, name: "No.", classes: "max-w-[50px]" },
  { id: 2, name: "Title", classes: "max-w-[200px]" },
  { id: 3, name: "Content", classes: "max-w-[200px]" },
  { id: 4, name: "Action", classes: "text-right" },
];

export const DASHBOARD_NAV_ITEMS: IDashboardNavItem[] = [
  { id: 1, name: "Dashboard", link: "/admin", disabled: true, icon: "LayoutDashboard" },
  { id: 2, name: "Posts", link: "/admin/posts", disabled: false, icon: "FileText" },
  { id: 3, name: "Users", link: "/admin/users", disabled: true, icon: "User" },
];

export const SITE_NAV_LINKS: ISiteNavItem[] = [
  { id: 1, name: "Home", link: "/", disabled: true },
  { id: 2, name: "Blog", link: "/posts", disabled: true },
  { id: 3, name: "Podcasts", link: "/podcasts", disabled: true },
  { id: 4, name: "Resources", link: "/resources", disabled: true },
];
export const TAGS: string[] = ["React", "Performance", "Frontend"];
