"use client";
import { useForm } from "react-hook-form"; // ✅ was missing
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // ✅ all FormX components were missing
import { Input } from "../ui/input"; // ✅ was missing

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)} // ✅ was form.handleCreateQuestion (doesn't exist)
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>{" "}
                {/* ✅ added missing asterisk */}
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
                <div>Editor</div>
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
                  {/* Render existing tags as badges */}
                  {field.value.map((tag: string) => (
                    <div
                      key={tag}
                      className="background-light-800_dark400 text-dark300_light700 flex items-center gap-1 rounded px-2 py-1 text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            field.value.filter((t: string) => t !== tag),
                          )
                        }
                        className="text-light-500 hover:text-primary-500 ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Tag input */}
                  <input
                    placeholder="Add tags..."
                    className="text-dark300_light700 background-light-700_dark300 no-focus placeholder flex-1 text-sm outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (
                          value &&
                          field.value.length < 3 &&
                          !field.value.includes(value)
                        ) {
                          field.onChange([...field.value, value]);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                </div>
              </FormControl>

              <p className="body-regular text-light-500 mt-2.5 text-sm font-medium">
                Tags
              </p>
              <FormDescription className="body-regular text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div>
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900 mt-10"
        >
          Ask A Question
        </Button>
      </div>
    </Form>
  );
};

export default QuestionForm;
