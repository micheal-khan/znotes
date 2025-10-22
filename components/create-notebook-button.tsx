"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "./ui/spinner";
import { Plus } from "lucide-react";
import { createNotebook } from "@/server/notebooks";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Notebook name must be at least 5 characters.")
    .max(32, "Notebook name must be at most 32 characters."),
});

const CreateNotebookButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const session = await authClient.getSession();
      const userId = session.data?.session.userId;

      if (!userId) {
        toast.error("You must be logged in to create a notebook.");
        setIsLoading(false);
        return;
      }

      const response = await createNotebook({
        name: data.name,
        userId,
      });

      if (response.success) {
        toast.success(response.message);
        form.reset();
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the notebook.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Notebook
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a notebook to store your notes</DialogTitle>
          <DialogDescription>
            Add the name of your new notebook below. You can change it later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Notebook Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="e.g. Work Notes"
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Create Notebook"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotebookButton;
