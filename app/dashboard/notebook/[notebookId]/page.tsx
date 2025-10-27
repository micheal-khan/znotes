import Bread from "@/components/breadcrums";
import CreateNoteButton from "@/components/create-note-button";
import { HoverEffect } from "@/components/ui/hover-effect";
import { deleteNotebook, getNotebookById } from "@/server/notebooks";

export default async function NotebookPage({
  params,
}: {
  params: { notebookId: string };
}) {
  const notebook = await getNotebookById(params.notebookId);

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
        <CreateNoteButton notebookId={params.notebookId} />

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
