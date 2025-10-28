import Bread from "@/components/breadcrums";
import CreateNoteButton from "@/components/create-note-button";
import { Banner } from "@/components/ui/banner";
import { HoverEffect } from "@/components/ui/hover-effect";
import { getNotebookById } from "@/server/notebooks";
import { Rocket } from "lucide-react";

export default async function NotebookPage({
  params,
}: {
  params: Promise<{ notebookId: string }>;
}) {
  const { notebookId } = await params; // ✅ Await the params first
  const notebook = await getNotebookById((await params).notebookId);

  return (
    <>
      <Bread
        breadcrumbs={[
          { label: "Dashboard", url: "/dashboard" },
          {
            label: notebook.notebook?.name || "Notebook",
            url: `/dashboard/notebook/${notebook.notebook?.id}`,
            active: true,
          },
        ]}
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
                  <CreateNoteButton notebookId={(await params).notebookId} />
                </div>
              </div>
            </div>
          </div>
        </Banner>

        <HoverEffect
          items={
            notebook?.notebook?.notes?.map((note) => ({
              title: note.title,
              description:
                extractTextFromTipTap(note.content).slice(0, 100) + "...",
              link: `/dashboard/note/${note.id}`,
              id: note.id,
              isNotebook: true,
            })) || []
          }
        />
      </div>
    </>
  );
}

function extractTextFromTipTap(content: any): string {
  if (!content) return "";
  if (Array.isArray(content)) {
    return content.map(extractTextFromTipTap).join(" ");
  }
  if (content.text) return content.text;
  if (content.content) return extractTextFromTipTap(content.content);
  return "";
}
