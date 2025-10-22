"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getNotebooks } from "@/server/notebooks";

const GettingNotebooks = () => {
  const handleNotebooks = async () => {
    const userId = (await authClient.getSession()).data?.session.userId;

    if (!userId) {
      console.error("User not authenticated");
      return;
    }
    const notebooks = await getNotebooks();
    console.log(notebooks);

    if (!notebooks.success) {
      console.error(notebooks.message);
      return;
    }
  };

  return (
    <>
      <Button onClick={handleNotebooks}>Fetch Notebooks</Button>
    </>
  );
};

export default GettingNotebooks;
