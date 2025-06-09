//core
import { ReactNode } from "react";
// components
import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
