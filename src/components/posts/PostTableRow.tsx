// components
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
// icons
import { Pencil, Trash2 } from "lucide-react";
// interface
import { IPostTableRowProps } from "@/lib/interface";

const PostTableRow = ({ index, title, body, onDelete, onEdit }: IPostTableRowProps) => (
  <TableRow>
    <TableCell className="font-medium px-3">{index}</TableCell>
    <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
      {title}
    </TableCell>
    <TableCell className="max-w-[300px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
      {body}
    </TableCell>
    <TableCell className="text-right">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onEdit}
        aria-label="Edit post"
        className="size-8 mr-2 text-blue-500 hover:bg-blue-100"
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onDelete}
        aria-label="Delete post"
        className="size-8 text-red-500 hover:bg-red-100"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </TableCell>
  </TableRow>
);

export default PostTableRow;
