"use client";

import { useState, useRef, useTransition } from "react";
import dynamic from "next/dynamic";
import HelpfulButton from "@/components/card/Helpfulbutton";
import AnswerActions from "@/components/answers/AnswerAction";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import { editAnswer, deleteAnswer } from "@/lib/answer.action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Props {
  answerId: string;
  content: string;
  isHelpful: boolean;
  helpfulCount: number;
  isAuthor: boolean;
  preview: React.ReactNode; // ← rendered Preview passed in from the server parent
}

const AnswerBody = ({
  answerId,
  content,
  isHelpful,
  helpfulCount,
  isAuthor,
  preview,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(content);
  const [isPending, startTransition] = useTransition();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleSave = () => {
    startTransition(async () => {
      const result = await editAnswer({ answerId, content: draft });
      if (result.success) {
        toast.success("Antwoord bijgewerkt");
        setIsEditing(false);
      } else {
        toast.error(result.error?.message || "Er ging iets mis");
      }
    });
  };

  const handleCancel = () => {
    setDraft(content);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex justify-end gap-4">
        <HelpfulButton
          answerId={answerId}
          initialIsHelpful={isHelpful}
          initialCount={helpfulCount}
        />
        {isAuthor && (
          <AnswerActions
            onEdit={() => setIsEditing(true)}
            onDeleteClick={() => setDeleteDialogOpen(true)}
          />
        )}
      </div>

      {isEditing ? (
        <div className="mt-3.5 flex flex-col gap-3">
          <Editor
          key={isEditing ? `editting-${answerId}` : "static"}
            markdown={draft}
            editorRef={editorRef}
            fieldChange={setDraft}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Annuleren
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="primary-gradient !text-light-900"
            >
              {isPending ? "Opslaan..." : "Opslaan"}
            </Button>
          </div>
        </div>
      ) : (
        preview
      )}

      <DeleteConfirmDialog
        title="Antwoord"
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={() => deleteAnswer({ answerId })}
      />
    </>
  );
};

export default AnswerBody;
