import Bread from "@/components/breadcrums";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { getNoteById } from "@/server/notes";

export default async function NotePage({
  params,
}: {
  params: { noteid: string };
}) {
  const note = await getNoteById(params.noteid);

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
            label: "Note",
            url: `/dashboard/note/${params.noteid}`,
            active: true,
          },
        ]}
      />

      <div className="p-4 flex flex-col gap-4">
        {/* TipTap editor */}
        <TipTapEditor
          initialContent={note.note?.content || ""}
          noteId={params.noteid}
        />
      </div>
    </>
  );
}
