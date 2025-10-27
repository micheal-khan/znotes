import Bread from "@/components/breadcrums";
import CreateNotebookButton from "@/components/create-notebook-button";
import { HoverEffect } from "@/components/ui/hover-effect";
import { getNotebooks } from "@/server/notebooks";

export default async function Page() {
  const notebooks = await getNotebooks();

  return (
    <>
      <Bread
        breadcrumbs={[{ label: "Dashboard", url: "/dashboard", active: true }]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <CreateNotebookButton />

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

function extractTextFromTipTap(content: any): string {
  if (!content) return "";
  if (Array.isArray(content)) {
    return content.map(extractTextFromTipTap).join(" ");
  }
  if (content.text) return content.text;
  if (content.content) return extractTextFromTipTap(content.content);
  return "";
}
