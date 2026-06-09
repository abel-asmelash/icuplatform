"use client";
import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import InitializedMDXEditor from "../InitializedMDXEditor";

interface Props extends MDXEditorProps {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, fieldChange, editorRef, ...props }: Props) => {
  return (
    <InitializedMDXEditor
      value={value}
      fieldChange={fieldChange}
      editorRef={editorRef}
      {...props}
    />
  );
};

export default Editor;
