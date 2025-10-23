import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface BreadcrumbItemType {
  label: string;
  url: string;
  active?: boolean;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItemType[];
}

const Bread = ({ breadcrumbs }: BreadcrumbProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4">
      {/* Left Section: Sidebar + Breadcrumb */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {crumb.active ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.url}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right Section: Theme Toggler */}
      <div>
        <AnimatedThemeToggler />
      </div>
    </header>
  );
};

export default Bread;
