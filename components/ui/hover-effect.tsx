"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Settings, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { deleteNotebook } from "@/server/notebooks";
import { deleteNote } from "@/server/notes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "./spinner";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string | number;
    link: string;
    isNotebook: boolean; // ✅ not Function
    id: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async (noteId: string, isNotebook: boolean) => {
    setIsDeleting(true);
    // Implement delete functionality here
    if (isNotebook) {
      try {
        const deleteResponse = await deleteNotebook(noteId);

        if (deleteResponse.success) {
          toast.success(deleteResponse.message);
          console.log("Notebook deleted successfully");
        } else {
          console.log("Failed to delete notebook:", deleteResponse.message);

          toast.error(deleteResponse.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsOpen(false);

        // Optionally, refresh the page or update the state to reflect the deletion
        window.location.reload();
      }
    } else {
      try {
        const deleteResponse = await deleteNote(noteId);

        if (deleteResponse.success) {
          toast.success(deleteResponse.message);
          console.log("Notebook deleted successfully");
        } else {
          console.log("Failed to delete notebook:", deleteResponse.message);

          toast.error(deleteResponse.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsOpen(false);

        // Optionally, refresh the page or update the state to reflect the deletion
        window.location.reload();
      }
    }
    setIsDeleting(false);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all duration-200"
                >
                  <Settings size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="[--radius:1rem]">
                <DropdownMenuGroup>
                  <Link href={item?.link}>
                    <DropdownMenuItem>
                      <Edit />
                      Copy Conversation
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={(e) => e.preventDefault()} // 👈 Prevent dropdown close
                      >
                        <TrashIcon />
                        Delete Conversation
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure you want to delete this{" "}
                          {item.isNotebook ? "Notebook" : "Note"}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your{" "}
                          <b>{item.isNotebook ? "Notebook" : "Note"} </b>
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isDeleting}
                          onClick={() => {
                            handleDelete(item?.id, item?.isNotebook);
                          }}
                        >
                          {isDeleting ? (
                            <>
                              <Spinner />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <TrashIcon />
                              Delete
                            </>
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={item?.link}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
