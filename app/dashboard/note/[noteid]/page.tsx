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
          { label: "Note", url: `/dashboard/note/${params.noteid}` },
          {
            label: note.note?.title || "Untitled",
            url: `/dashboard/note/${params.noteid}`,
            active: true,
          },
        ]}
      />

      <div className="p-4 flex flex-col gap-4">
        <h1>{note.note?.title || "Untitled"}</h1>

        {/* TipTap editor */}
        <TipTapEditor initialContent={note.note?.content || ""} noteId={params.noteid} />
      </div>
    </>
  );
}
