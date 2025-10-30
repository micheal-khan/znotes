import Bread from "@/components/breadcrums";
import CreateNotebookButton from "@/components/create-notebook-button";
import { Banner } from "@/components/ui/banner";
import { HoverEffect } from "@/components/ui/hover-effect";
import { getNotebooks } from "@/server/notebooks";
import { Rocket } from "lucide-react";

export default async function Page() {
  const notebooks = await getNotebooks();

  return (
    <>
      <Bread
        breadcrumbs={[{ label: "Dashboard", url: "/dashboard", active: true }]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Banner variant="border" className="">
          <div className="flex w-full gap-2 md:items-center">
            <div className="flex grow gap-3 md:items-center">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5"
                aria-hidden="true"
              >
                <Rocket className="opacity-80" size={16} strokeWidth={2} />
              </div>
              <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    Welcome to the new Znotes dashboard!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The new feature is live! Try it out and let us know what you
                    think.
                  </p>
                </div>
                <div className="flex gap-2 max-md:flex-wrap">
                  <CreateNotebookButton />
                </div>
              </div>
            </div>
          </div>
        </Banner>
        {/* Show notebooks list */}
        {notebooks.success &&
          notebooks.notebooks &&
          notebooks.notebooks.length > 0 && (
            <HoverEffect
              items={
                notebooks?.notebooks.map((note) => ({
                  title: note.name,
                  description:
                    note.notes.length == 0
                      ? "No notes"
                      : `${note.notes.length} Note${note.notes.length > 1 ? "s" : ""}`,
                  link: `/dashboard/notebook/${note.id}`,
                  id: note.id,
                  isNotebook: true,
                })) || []
              }
            />
          )}

        {/* If no notebooks exist */}
        {notebooks.success &&
          notebooks.notebooks &&
          notebooks.notebooks.length === 0 && (
            <div className="text-zinc-400 text-sm text-center mt-10">
              No notebooks found. Create a new one to get started!
            </div>
          )}
      </div>
    </>
  );
}
