import SiteHeader from "@/components/layout/SiteHeader";
import { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SiteHeader />
      <main className="p-4 overflow-auto px-20">{children}</main>
    </div>
  );
};
export default SiteLayout;
