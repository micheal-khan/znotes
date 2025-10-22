import CreateNotebookButton from "@/components/create-notebook-button";
import { getNotebooks } from "@/server/notebooks";

export default async function Page() {
  const notebooks = await getNotebooks();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <CreateNotebookButton />
      {notebooks.success &&
        notebooks?.notebooks?.map((notebooks) => (
          <div key={notebooks.id}>{notebooks.name}</div>
        ))}

      {notebooks.success && notebooks?.notebooks?.length === 0 && (
        <div>No notebooks found. Create a new notebook to get started!</div>
      )}
    </div>
  );
}
