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
  // type MDXEditorProps,
  toolbarPlugin,
  ConditionalContents,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  // CreateLink,
  linkPlugin,
  linkDialogPlugin,
  ListsToggle,
  // InsertImage,
  // imagePlugin,
  BlockTypeSelect,
  CodeToggle,
  Separator,
} from "@mdxeditor/editor";
// import "@mdxeditor/editor/style.css";

interface Props  {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

export default function InitializedMDXEditor({
  editorRef,
  fieldChange,
  value,
 
 
}: Props) {
  return (
    <MDXEditor
      onChange={fieldChange}
      markdown={value ?? ""}
      className="background-light800_dark400 light-border-2 grid markdown-editor w-full border `min-h-50` caret-white"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        // imagePlugin(),
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
                      {/* <CreateLink /> */}
                      {/* <InsertImage /> */}
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    
      ref={editorRef ?? null}
    />
  );
}
