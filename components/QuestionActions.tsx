"use client";
import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { deleteQuestion } from "@/lib/action/question.action";
import { useRouter } from "next/navigation";

interface Props {
  questionId: string;
}

const QuestionActions = ({ questionId }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-dark400_light700 hover:text-primary-500 hover:bg-light-800 dark:hover:bg-dark-400 p-1.5 rounded-md transition-colors">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/questions/${questionId}/edit`)}
          >
            <Pencil size={14} className="mr-2" />
            Bewerken
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // stops the dropdown from swallowing focus before the dialog mounts
              setDeleteDialogOpen(true);
            }}
            className="text-red-500 focus:text-red-500"
          >
            <Trash2 size={14} className="mr-2" />
            Verwijderen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmDialog
        title="Vraag"
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={async () => {
         
          return await deleteQuestion({ questionId });
        }}
      />
    </>
  );
};

export default QuestionActions;
