"use client";
// core
import { useEffect, useRef } from "react";
// library
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
// component
import { Button } from "@/components/ui/button";
// icons
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  UnderlineIcon,
  Quote,
  Code,
  Code2,
  ImageIcon,
  Minus,
  Paintbrush2,
} from "lucide-react";
// interface
import { ITextEditorProps } from "@/lib/interface";

// config
const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-600 underline",
    },
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Image.configure({
    HTMLAttributes: {
      class: "max-w-full h-auto rounded-lg",
    },
  }),
  TextStyle,
  Color.configure({ types: ["textStyle"] }),
  Highlight.configure({
    multicolor: true,
  }),
];

const RichTextEditor = ({ content, onChange, id }: ITextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[200px] p-4 prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-lg prose-hr:border-gray-300",
      },
    },
    autofocus: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-background text-foreground">
      <div className="flex flex-wrap items-center rounded-t-lg gap-1 p-3 border-b bg-gray-50 dark:bg-gray-800">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-muted" : ""}
        >
          <UnderlineIcon />
        </Button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-muted" : ""}
        >
          <Quote />
        </Button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-muted" : ""}
        >
          <Code2 />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-muted" : ""}
        >
          <Code />
        </Button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
        >
          <AlignLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
        >
          <AlignCenter />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
        >
          <AlignRight />
        </Button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </Button>
        <Button variant="outline" size="sm" onClick={() => colorInputRef.current?.click()}>
          <Paintbrush2 />
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colorInputRef?.current?.value || "#000" }}
          ></span>

          <input
            type="color"
            ref={colorInputRef}
            className="absolute invisible"
            onChange={(e) => {
              const color = e.target.value;
              if (color) editor.chain().focus().setColor(color).run();
            }}
          />
        </Button>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            editor
              .chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          };
          reader.readAsDataURL(file);
        }}
      />

      <div className="relative">
        <EditorContent editor={editor} id={id} className="tiptap-editor" />
      </div>

      <style jsx global>{`
        .tiptap-editor .ProseMirror {
          outline: none;
        }

        .tiptap-editor .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .tiptap-editor .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .tiptap-editor .ProseMirror li {
          margin: 0.25rem 0;
          padding-left: 0.25rem;
        }

        .tiptap-editor .ProseMirror li p {
          margin: 0;
        }

        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .tiptap-editor .ProseMirror blockquote p {
          margin: 0.5rem 0;
        }

        .tiptap-editor .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: "Courier New", monospace;
          font-size: 0.875rem;
        }

        .tiptap-editor .ProseMirror pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
        }

        .tiptap-editor .ProseMirror pre code {
          background: none;
          padding: 0;
          border-radius: 0;
        }

        .tiptap-editor .ProseMirror h1 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 1rem 0 0.5rem 0;
        }

        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
        }

        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
        }

        .tiptap-editor .ProseMirror p {
          margin: 0.5rem 0;
        }

        .tiptap-editor .ProseMirror hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1rem 0;
        }

        .tiptap-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }

        /* Dark mode styles */
        .dark .tiptap-editor .ProseMirror blockquote {
          border-left-color: #4b5563;
          color: #9ca3af;
        }

        .dark .tiptap-editor .ProseMirror code {
          background-color: #374151;
          color: #f9fafb;
        }

        .dark .tiptap-editor .ProseMirror pre {
          background-color: #374151;
        }

        .dark .tiptap-editor .ProseMirror hr {
          border-top-color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
