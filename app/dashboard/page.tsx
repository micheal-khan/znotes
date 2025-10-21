import Notebooks from "@/components/notebooks";
import { getNotebook } from "@/server/notebooks";

export default async function Page() {
  const notebooks = await getNotebook();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
