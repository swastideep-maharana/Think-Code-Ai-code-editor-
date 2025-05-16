// components/CodeEditor.tsx
"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange }: any) {
  return (
    <Editor
      height="500px"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={value}
      onChange={onChange}
    />
  );
}
