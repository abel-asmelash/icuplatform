"use client";
import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../InitializedMDXEditor"), {
  ssr: false,
}) as React.ComponentType<{
  value: string;
  fieldChange: (value: string) => void;
}>;

export default Editor;
