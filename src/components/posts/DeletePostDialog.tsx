// components
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
// icons
import { Loader2Icon } from "lucide-react";
// interface
import { IDeletePostDialogProps } from "@/lib/interface";

const DeletePostDialog = ({
  open,
  setOpen,
  onSubmit,
  onClose,
  submitLoading,
}: IDeletePostDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) onClose?.();
      }}
    >
      <DialogContent className="sm:max-w-[445px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            className="!min-w-9 bg-red-500 hover:bg-red-600 dark:text-white"
            disabled={submitLoading}
            onClick={onSubmit}
          >
            {submitLoading ? <Loader2Icon className="animate-spin" /> : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
