"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Props {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<{ success: boolean; error?: { message: string } }>;
}

const DeleteConfirmDialog = ({
  title,
  open,
  onOpenChange,
  onDelete,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await onDelete();
      if (result.success) {
        toast.success(`${title} succesvol verwijderd`);
        onOpenChange(false);
      } else {
        toast.error(result.error?.message || "Er ging iets mis");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title} verwijderen?</AlertDialogTitle>
          <AlertDialogDescription>
            Deze actie kan niet ongedaan worden gemaakt. Dit zal deze{" "}
            {title.toLowerCase()} permanent verwijderen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Bezig met verwijderen..." : "Verwijderen"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
