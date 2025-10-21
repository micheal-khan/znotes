import { AppSidebar } from "@/components/app-sidebar";
import Bread from "@/components/breakcrum";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4">
          {/* Left Section: Sidebar + Breadcrumb */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Bread
              breadcrumbs={[
                { label: "Home", url: "/", active: false },
                { label: "Dashboard", url: "/dashboard", active: true },
              ]}
            />
          </div>

          {/* Right Section: Theme Toggler */}
          <div>
            <AnimatedThemeToggler />
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
