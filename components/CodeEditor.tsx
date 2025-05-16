// components/CodeEditor.tsx
"use client";
import Editor from "@monaco-editor/react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

const CodeEditor = (props: EditorProps) => {
  return (
    <Editor
      height="500px"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={props.value}
      onChange={(value) => props.onChange(value ?? "")}
    />
  );
};

export default CodeEditor;
