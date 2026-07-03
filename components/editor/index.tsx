"use client";
import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

const EditorComp = dynamic(() => import("../InitializedMDXEditor"), {
  ssr: false,
});

interface Props {
  value: string;
  fieldChange: (value: string) => void;
}

const Editor = forwardRef<MDXEditorMethods, Props>((props, ref) => {
  return <EditorComp {...props} editorRef={ref} />;
});

Editor.displayName = "Editor";

export default Editor;
