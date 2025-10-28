import Bread from "@/components/breadcrums";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { getNoteById } from "@/server/notes";

export default async function NotePage({
  params,
}: {
  params: Promise<{ noteid: string }>;
}) {
  const note = await getNoteById((await params).noteid);

  return (
    <>
      <Bread
        breadcrumbs={[
          { label: "Dashboard", url: "/dashboard" },
          {
            label: note.note?.notebook.name || "Notebook",
            url: `/dashboard/notebook/${note.note?.notebook.id}`,
          },
          {
            label: note.note?.title || "Untitled Note",
            url: `/dashboard/note/${(await params).noteid}`,
            active: true,
          },
        ]}
      />

      <div className="p-4 flex flex-col gap-4">
        {/* TipTap editor */}
        <TipTapEditor
          initialContent={note.note?.content || ""}
          noteId={(await params).noteid}
        />
      </div>
    </>
  );
}
