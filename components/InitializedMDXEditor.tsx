"use client";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  ConditionalContents,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CreateLink,
  linkPlugin,
  linkDialogPlugin,
  ListsToggle,
  InsertImage,
  imagePlugin,
  BlockTypeSelect,
  CodeToggle,
  Separator,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

interface Props extends MDXEditorProps {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

export default function InitializedMDXEditor({
  value,
  editorRef,
  fieldChange,
  ...props
}: Props) {
  return (
    <MDXEditor
      markdown={value}
      onChange={fieldChange}
      className="background-light800_dark400 light-border-2 grid markdown-editor w-full border min-h-[200px] caret-white"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            ts: "TypeScript",
            css: "CSS",
            html: "HTML",
          },
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  contents: () => <ChangeCodeMirrorLanguage />,
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <CreateLink />
                      <InsertImage />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
