"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useRef } from "react";
import z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import Editor from "@/components/editor";
import { createAnswer } from "@/lib/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
 import { api } from "@/lib/api";  

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });
      if (result.success) {
        form.reset();
        toast.success("Success", {
          description: "Your answer has been posted succesfully",
        });
    
        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error("Error", {
          description: result.error?.message,
        });
      }
    });
  };

  const handleGenerateAIAnswer = async () => {
    
    if (session.status !== "authenticated") {
      return toast.error("Gelieve eerst in te loggen", {
        description: "U moet ingelogd zijn om deze functie te gebruiken.",
      });
    }
    
    const userAnswer = editorRef.current?.getMarkdown()?.trim();
    if(!userAnswer){
       toast.error("Formuleer eerst een antwoord", {
         description:
           "Typ eerst een eerste aanzet. De AI helpt je daarna om je antwoord verder te verfijnen.",
       });
       return
    }
    setIsAISubmitting(true);
    try {
      const result = await api.ai.getAnswer(questionTitle, questionContent, userAnswer);
      if (!result.success) {
        return toast.error("Error", {
          description: result.error?.message,
        });
      }

      const formattedAnswer = result.data
        .replace(/<br>/g, "")
        .toString()
        .trim();
      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }

      toast.success("Success", {
        description: "AI generated answer has been generated",
      });
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "There was a problem with your request",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Schrijf je antwoord hier
        </h4>
        <Button
          type="button"
          onClick={handleGenerateAIAnswer}
          className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              AI denkt na...
            </>
          ) : (
            <>
              <Bot className="size-6" />
              Genereer AI-antwoord
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          // eslint-disable-next-line react-hooks/refs -- false positive, handleSubmit only reads editorRef inside the event callback, not during render
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    ref={editorRef}
                    value={field.value ?? ""}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isAnswering}
              className="primary-gradient w-fit"
            >
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Indienen...
                </>
              ) : (
                "Plaats een antwoord"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
