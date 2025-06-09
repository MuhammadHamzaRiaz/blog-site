"use client";
// core
import { useEffect, useState } from "react";
// components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "../common/RichTextEditor";
// icons
import { Loader2Icon } from "lucide-react";
// interface
import { IPostFormDialogProps } from "@/lib/interface";

const PostFormDialog = ({
  open,
  setOpen,
  onSubmit,
  submitLoading,
  mode,
  initialData,
  onClose,
}: IPostFormDialogProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dialogTitle = mode === "edit" ? "Edit Post" : "Create Post";
  const dialogDescription =
    mode === "edit"
      ? "Update your post details below."
      : "Fill in the details to create a new post.";
  const submitButtonText = mode === "edit" ? "Update Post" : "Create Post";

  useEffect(() => {
    if (open && initialData) {
      setTitle(initialData.title || "");
      setBody(initialData.body || "");
    } else if (open && !initialData) {
      setTitle("");
      setBody("");
    }
  }, [open, initialData]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    setTitle("");
    setBody("");
  };

  const handleSubmit = () => {
    onSubmit({ title, body });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="sm:max-w-[445px] max-h-[90vh] overflow-y-auto py-4">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              disabled={submitLoading}
              aria-required="true"
              className="focus-visible:ring-0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="post-body">Body</Label>
            <RichTextEditor id="post-body" content={body} onChange={setBody} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={submitLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitLoading || !title.trim()}
            className="!min-w-9"
          >
            {submitLoading ? <Loader2Icon className="animate-spin" /> : submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;
