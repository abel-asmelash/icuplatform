"use client";

import { useSession } from "next-auth/react";
import { useState, use } from "react";
import { toast } from "sonner";
import { toggleSaveQuestion } from "@/lib/action/collection.action";
import { ActionResponse } from "@/types/actions";

const SaveQuestion = ({
  questionId,
  hasSavedQuestionPromise,
}: {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const { data } = use(hasSavedQuestionPromise);
  const { saved: hasSaved } = data || {};
  const [isLoading, setIsLoading] = useState(false);
 const [saved, setSaved] = useState(hasSaved)
  const handleSave = async () => {
    if (!userId) {
      return toast.error("You need to be logged in to save a question");
    }

    setIsLoading(true);
    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });
      if (!success) throw new Error(error?.message || "An error occurred");
      setSaved(data?.saved)
      toast.success(
        `Question ${data?.saved ? "saved" : "unsaved"} successfully`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        disabled={isLoading}
        aria-label={saved ? "Unsave question" : "Save question"}
        className={`flex items-center gap-2 rounded-md border border-light-700 dark:border-dark-400 px-3 py-1.5 transition-all hover:bg-light-800 dark:hover:bg-dark-400 ${
          isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={saved ? "#F2A623" : "none"}
          stroke={saved ? "#F2A623" : "currentColor"}
          strokeWidth={saved ? "0" : "1.5"}
          className={saved ? "" : "text-dark400_light700"}
        >
          <path
            d="M12 2l2.9 6.26 6.9.6-5.2 4.52 1.58 6.77L12 16.9l-6.18 3.25 1.58-6.77-5.2-4.52 6.9-.6L12 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="body-medium text-dark300_light700">
          {saved ? "Saved" : "Save this question"}
        </span>
      </button>
      
    </>
  );
};

export default SaveQuestion;
