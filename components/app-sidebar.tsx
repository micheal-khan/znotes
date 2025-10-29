import * as React from "react";
import { BookOpen, Command } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import { SearchForm } from "./search-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  if (!notebooks.success) {
    console.error(notebooks.message);
    return;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.userId) {
    console.error("User not found");
    return;
  }

  const data = {
    user: {
      name: session.user.name || "User",
      userId: session.user.id || "User",
      email: session.user.email || "m@example.com",
      avatar: session.user.image || "/avatars/shadcn.jpg",
    },
    navMain: [
      ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/notebook/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <Image
                  src={"/Znotes light.png"}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="block dark:hidden"
                />
                <Image
                  src={"/Znotes dark.png"}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Znotes</span>
                  <span className="truncate text-xs">Notes taking app</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm className="mt-1" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
