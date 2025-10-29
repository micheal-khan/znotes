"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading, { Level } from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { QuoteIcon } from "lucide-react"; // add this at the top with other icons
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "../tiptap-ui-primitive/spacer";
import { updateNote } from "@/server/notes";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  Link2Icon,
  ListIcon,
  CheckIcon,
  UndoIcon,
  RedoIcon,
  ImageIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  Code2,
  Highlighter,
} from "lucide-react";

interface TipTapEditorProps {
  initialContent?: any;
  noteId?: string;
}

export default function TipTapEditor({
  initialContent,
  noteId,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // we'll add our own heading
        bulletList: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
      Subscript,
      Superscript,
      Link.configure({ openOnClick: true }),
      Color,
      Code,
      BulletList,
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log("Content updated:", editor.getJSON());
      
      // if (noteId) {
      //   updateNote(noteId, { content: editor.getJSON() });
      // }
    },
  });

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="border rounded-lg p-4 flex flex-col min-h-[500px]">
      {/* Toolbar */}
      <Toolbar variant="floating">
        {/* Basic formatting */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <BoldIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <ItalicIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-muted" : ""}
          >
            <StrikethroughIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => {
              const url = prompt("Enter URL:");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            className={editor.isActive("link") ? "bg-muted" : ""}
          >
            <Link2Icon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "#b197fc" }).run()
            }
            className={
              editor.isActive("highlight", { color: "#b197fc" })
                ? "bg-muted"
                : ""
            }
          >
            <Highlighter className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-muted" : ""}
          >
            <Code2 className="tiptap-button-icon" />
          </Button>

          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-muted" : ""}
          >
            <QuoteIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Headings */}
        <ToolbarGroup>
          {([1, 2, 3, 4] as Level[]).map((level) => (
            <Button
              key={level}
              data-style="ghost"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: level as Level })
                  .run()
              }
              className={
                editor.isActive("heading", { level }) ? "bg-muted" : ""
              }
            >
              H{level}
            </Button>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Text alignment */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
          >
            <AlignLeftIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""
            }
          >
            <AlignCenterIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""
            }
          >
            <AlignRightIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""
            }
          >
            <AlignJustifyIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Lists */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-muted" : ""}
          >
            <ListIcon className="tiptap-button-icon" />
          </Button>

          <Button
            data-style="ghost"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive("taskList") ? "bg-muted" : ""}
          >
            <CheckIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Undo / Redo / Image */}
        <ToolbarGroup>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().undo().run()}
          >
            <UndoIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => editor.chain().redo().run()}
          >
            <RedoIcon className="tiptap-button-icon" />
          </Button>
          <Button
            data-style="ghost"
            onClick={() => {
              const url = prompt("Enter image URL:");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
          >
            <ImageIcon className="tiptap-button-icon" />
          </Button>
        </ToolbarGroup>

        <Spacer />

        {/* Save / Clear */}
        <ToolbarGroup>
          <Button
            data-style="secondary"
            onClick={() => editor.commands.clearContent()}
          >
            Clear
          </Button>
        </ToolbarGroup>
      </Toolbar>

      {/* Editor Area */}
      <EditorContent
        placeholder="Start typing your note..."
        editor={editor}
        className=" 
          w-full h-full flex-1 mt-4 prose dark:prose-invert max-w-none
          outline-none border-none focus:outline-none focus-visible:ring-0
          [&_.ProseMirror]:w-full [&_.ProseMirror]:h-full
          [&_.ProseMirror]:min-h-[100%] [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:border-none
        "
      />
    </div>
  );
}
