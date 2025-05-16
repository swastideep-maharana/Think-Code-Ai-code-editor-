"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FocusEvent,
} from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "../../components/protectedRoute";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import {
  SunIcon,
  MoonIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  BoltIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const tutorials = [
  {
    title: "Getting Started 🚀",
    content:
      "Type some HTML, CSS, or JS code in the editor and see the preview live. Have fun coding!",
  },
  {
    title: "AI Code Generation 🤖",
    content:
      "Enter a prompt for AI code generation and append it to your code. Let's get those robots to help!",
  },
  {
    title: "Export & Share 🎉",
    content:
      "Export your code as an HTML file or share a magical link with your masterpiece embedded.",
  },
];

export default function CodeEditor() {
  // State hooks with lazy initialization from localStorage
  const [code, setCode] = useState<string>(
    () => localStorage.getItem("code") || "<!-- Start coding here -->"
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const [showAI, setShowAI] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("showAI") ?? "true")
  );
  const [showPreview, setShowPreview] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("showPreview") ?? "true")
  );
  const [showOutput, setShowOutput] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("showOutput") ?? "false")
  );
  const [showTutorials, setShowTutorials] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("showTutorials") ?? "false")
  );

  const [aiOutput, setAiOutput] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const editorRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  // Update live preview iframe whenever code changes
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(code);
      doc.close();
    }
  }, [code]);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("showAI", JSON.stringify(showAI));
  }, [showAI]);

  useEffect(() => {
    localStorage.setItem("showPreview", JSON.stringify(showPreview));
  }, [showPreview]);

  useEffect(() => {
    localStorage.setItem("showOutput", JSON.stringify(showOutput));
  }, [showOutput]);

  useEffect(() => {
    localStorage.setItem("showTutorials", JSON.stringify(showTutorials));
  }, [showTutorials]);

  // Read code from URL param (base64 encoded) if present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const codeParam = params.get("code");
      if (codeParam) {
        const decoded = atob(codeParam);
        setCode(decoded);
      }
    } catch {
      // ignore errors
    }
  }, []);

  // Monaco editor reference setup
  function handleEditorDidMount(
    editor: import("monaco-editor").editor.IStandaloneCodeEditor
  ) {
    editorRef.current = editor;
  }

  // Editor commands
  function undo() {
    editorRef.current?.trigger("keyboard", "undo", null);
  }

  function redo() {
    editorRef.current?.trigger("keyboard", "redo", null);
  }

  function format() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }

  // Export code as .html file
  function exportCode() {
    try {
      const blob = new Blob([code], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "code.html";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to export code.");
    }
  }

  // Create shareable link with base64 encoded code
  function share() {
    try {
      const encoded = btoa(code);
      const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
      navigator.clipboard.writeText(url);
      alert("✨ Shareable link copied to clipboard! ✨");
    } catch {
      alert("Oops! Failed to create shareable link.");
    }
  }

  // Fake AI code generation (simulate async)
  async function generateAI() {
    if (!prompt.trim()) return alert("Please enter a prompt!");
    setLoading(true);
    setAiOutput("");
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const fakeResponse = `<!-- 🤖 AI generated snippet for: ${prompt} -->\n<div>\n  <p>This code was magically generated by AI based on your prompt.</p>\n</div>`;
      setAiOutput(fakeResponse);
    } catch {
      setAiOutput("😵‍💫 Error generating AI code. Try again!");
    } finally {
      setLoading(false);
    }
  }

  // Append AI output to current code, clear prompt and AI output
  function appendAIOutput() {
    if (!aiOutput.trim()) return;
    setCode((prev) => prev + "\n\n" + aiOutput);
    setAiOutput("");
    setPrompt("");
    promptRef.current?.blur();
  }

  // Auto select prompt text on focus for convenience
  function handlePromptFocus(e: FocusEvent<HTMLTextAreaElement>) {
    e.target.select();
  }

  return (
    <ProtectedRoute>
      <div
        className={`flex flex-col h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 bg-opacity-80 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-3xl font-extrabold flex items-center gap-3 select-none">
            <PlayIcon className="w-8 h-8 text-blue-500 animate-pulse" />
            DevPilot
          </h1>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <>
                  <SunIcon className="w-5 h-5 mr-1" /> Light Mode
                </>
              ) : (
                <>
                  <MoonIcon className="w-5 h-5 mr-1" /> Dark Mode
                </>
              )}
            </Button>

            <Button variant="ghost" onClick={undo} title="Undo">
              <ArrowUturnLeftIcon className="w-5 h-5" />
            </Button>

            <Button variant="ghost" onClick={redo} title="Redo">
              <ArrowUturnRightIcon className="w-5 h-5" />
            </Button>

            <Button variant="ghost" onClick={format} title="Format Document">
              <ArrowPathIcon className="w-5 h-5" />
            </Button>

            <Button variant="ghost" onClick={exportCode} title="Export as HTML">
              <DocumentArrowDownIcon className="w-5 h-5" />
            </Button>

            <Button variant="ghost" onClick={share} title="Copy Shareable Link">
              <ShareIcon className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-grow overflow-hidden">
          {/* Editor Panel */}
          <section className="w-1/3 border-r border-gray-300 dark:border-gray-700">
            <MonacoEditor
              language="html"
              theme={darkMode ? "vs-dark" : "vs-light"}
              value={code}
              onChange={(v) => setCode(v || "")}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },

                fontSize: 14,
                fontFamily: "Fira Code, monospace",
                wordWrap: "on",
                automaticLayout: true,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
              }}
            />
          </section>
          {/* Preview & Panels */}
          <section className="flex flex-col w-2/3 p-4 gap-4 overflow-auto">
            {/* Toolbar toggles */}
            <div className="flex items-center gap-6 mb-2 flex-wrap">
              <Checkbox
                id="toggle-ai"
                checked={showAI}
                onCheckedChange={(checked) => setShowAI(checked === true)}
              />
              <label htmlFor="toggle-ai" className="cursor-pointer select-none">
                Show AI Panel
              </label>

              <Checkbox
                id="toggle-preview"
                checked={showPreview}
                onCheckedChange={(checked) => setShowPreview(checked === true)}
              />
              <label
                htmlFor="toggle-preview"
                className="cursor-pointer select-none"
              >
                Show Live Preview
              </label>

              <Checkbox
                id="toggle-output"
                checked={showOutput}
                onCheckedChange={(checked) => setShowOutput(checked === true)}
              />
              <label
                htmlFor="toggle-output"
                className="cursor-pointer select-none"
              >
                Show AI Output
              </label>

              <Checkbox
                id="toggle-tutorials"
                checked={showTutorials}
                onCheckedChange={(checked) => setShowTutorials(checked === true)}
              />
              <label
                htmlFor="toggle-tutorials"
                className="cursor-pointer select-none"
              >
                Show Tutorials
              </label>
            </div>

            {/* Panels */}
            <div className="flex flex-grow gap-4 overflow-auto">
              {/* AI Panel */}
              {showAI && (
                <section className="flex flex-col w-1/2 bg-gray-50 dark:bg-gray-800 rounded-md p-3 shadow-inner">
                  <h2 className="font-semibold mb-2 flex items-center gap-2">
                    <BoltIcon className="w-5 h-5 text-yellow-500" /> AI Code
                    Generator
                  </h2>

                  <Textarea
                    ref={promptRef}
                    value={prompt}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setPrompt(e.target.value)
                    }
                    onFocus={handlePromptFocus}
                    placeholder="Describe what you want the AI to generate..."
                    rows={3}
                    className="mb-2 resize-none"
                    disabled={loading}
                  />

                  <div className="flex gap-2 mb-2">
                    <Button
                      onClick={generateAI}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? "Generating..." : "Generate"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPrompt("");
                        setAiOutput("");
                        promptRef.current?.focus();
                      }}
                      disabled={loading}
                    >
                      Clear
                    </Button>
                  </div>

                  {showOutput && (
                    <div className="flex flex-col flex-grow overflow-auto bg-white dark:bg-gray-900 rounded-md p-3 font-mono text-sm whitespace-pre-wrap border border-gray-300 dark:border-gray-700">
                      {aiOutput || "AI generated code will appear here..."}
                    </div>
                  )}

                  <Button
                    onClick={appendAIOutput}
                    disabled={!aiOutput.trim()}
                    className="mt-2"
                  >
                    Append AI Output to Code
                  </Button>
                </section>
              )}

              {/* Live Preview */}
              {showPreview && (
                <section className="flex flex-col w-1/2 bg-white dark:bg-gray-900 rounded-md p-3 shadow-inner overflow-auto">
                  <h2 className="font-semibold mb-2">Live Preview</h2>
                  <iframe
                    ref={iframeRef}
                    title="Live Preview"
                    className="flex-grow w-full h-full border rounded-md"
                    sandbox="allow-scripts allow-same-origin"
                    style={{ minHeight: "300px", border: "1px solid #ccc" }}
                  />
                </section>
              )}

              {/* Tutorials */}
              {showTutorials && (
                <section className="w-1/3 bg-gray-50 dark:bg-gray-800 rounded-md p-3 shadow-inner overflow-auto">
                  <h2 className="font-semibold mb-2">Tutorials</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {tutorials.map(({ title, content }, idx) => (
                      <li key={idx}>
                        <strong>{title}</strong>: {content}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
