"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { createQuestion, editQuestion } from "@/lib/action/question.action";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import TagCard from "@/components/cards/TagCard";
import { useRef, useTransition } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface Params {
  question?: Question;
  isEdit?: boolean;
}

 
const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag: Tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[]; onChange: (tags: string[]) => void },
  ) => {
    const tagInput = e.currentTarget.value.trim();

    if (e.key === "Enter") {
      e.preventDefault();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length >= 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (
    tag: string,
    field: { value: string[]; onChange: (tags: string[]) => void },
  ) => {
    field.onChange(field.value.filter((t: string) => t !== tag));
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>,
  ) => {
    startTransition(async () => {
      
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question._id,
          ...data,
        });  

        if (result.success) {
          toast.success("Question updated successfully");
          if (result.data) router.push(ROUTES.QUESTION(result.data._id));
        } else {
          toast.error(result.error?.message || "Something went wrong");
        }
        return;  
      }

       
      const result = await createQuestion(data);
      if (result.success) {
        toast.success("Question created successfully");
        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error(result.error?.message || "Something went wrong");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="paragraph-regular background-light-700_dark300 light-border-2 text-dark300_light700 no-focus min-h-10 border"
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you are asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Explanation of your question{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    markdown={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you have put in the
                title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="background-light-700_dark300 light-border-2 flex min-h-10 flex-wrap gap-2 rounded-md border px-3 py-2">
                  <input
                    placeholder="Add tags..."
                    className="text-dark300_light700 background-light-700_dark300 no-focus placeholder flex-1 text-sm outline-none"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                </div>
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                  {field.value.map((tag: string) => (
                    <TagCard
                      key={tag}
                      _id={tag}
                      name={tag}
                      compact
                      remove
                      isButton
                      handleRemove={() => handleTagRemove(tag, field)}
                    />
                  ))}
                </div>
              )}
              <FormDescription className="body-regular text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={isPending}
            className="primary-gradient w-fit !text-light-900 mt-10"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
               
              <>{isEdit ? "Edit Question" : "Ask A Question"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
