"use client";
 
import dynamic from "next/dynamic";
import type { MDXEditorMethods } from "@mdxeditor/editor";

const EditorComp = dynamic(() => import("../InitializedMDXEditor"), {
  ssr: false,
});

interface Props {
  markdown: string;
  fieldChange: (value: string) => void;
  editorRef: React.RefObject<MDXEditorMethods | null>;
}

const Editor = ({ markdown, fieldChange, editorRef }: Props) => {
  return (
    <EditorComp
      value={markdown}
      fieldChange={fieldChange}
      editorRef={editorRef}
    />
  );
};

Editor.displayName = "Editor";

export default Editor;
