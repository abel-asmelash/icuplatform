"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";  
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
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
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

 
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[]; onChange: (tags: string[]) => void },
  ) => {
    const tagInput = e.currentTarget.value.trim(); // ✅ moved outside the if block

    if (e.key === "Enter") {
      e.preventDefault(); // ✅ Bug 2 fixed: was e.prentDefault()

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length >= 15) {
        // ✅ Bug 3 fixed: now reachable
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

  // ✅ Bug 4 fixed: accepts tag and field params
  const handleTagRemove = (
    tag: string,
    field: { value: string[]; onChange: (tags: string[]) => void },
  ) => {
    field.onChange(field.value.filter((t: string) => t !== tag));
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data)
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
                    value={field.value}
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
            className="primary-gradient w-fit !text-light-900 mt-10"
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
