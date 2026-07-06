"use client";

import { useState } from "react";
import { toggleQuestionHelpful } from "@/lib/action/question.action";
import { toast } from "sonner";
 
interface Props {
  questionId: string;
  initialIsHelpful: boolean;
  initialCount: number;
}

const HelpfulButton = ({ questionId, initialIsHelpful, initialCount }: Props) => {
  const [isHelpful, setIsHelpful] = useState(initialIsHelpful);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);

    
    const previousIsHelpful = isHelpful;
    const previousCount = count;
    setIsHelpful(!isHelpful);
    setCount(isHelpful ? count - 1 : count +1);

    const result = await toggleQuestionHelpful({ questionId });

    if (!result.success) {
 
      setIsHelpful(previousIsHelpful);
      setCount(previousCount);
      toast.error("Something went wrong", {
        description: result.error?.message,
      });
    }

    setIsPending(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 text-sm disabled:opacity-50"
    >
      <span>{isHelpful ? "👍" : "👍"}</span>
      <span className="text-light400_light500">
        {count} {count === 1 ? "person found" : "people found"} this helpful
      </span>
    </button>
  );
};

export default HelpfulButton;
