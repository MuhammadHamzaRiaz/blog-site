//components
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const PostsTableSkeleton = () => {
  const columns = ["No.", "Title", "Content", "Action"];

  return (
    <Card className="border rounded-lg gap-2 p-3 flex flex-col max-h-[calc(100vh-86px)]">
      <div className="px-3 flex justify-between items-center">
        <div className="text-xl font-medium text-black dark:text-white">Blog Posts</div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <Table className="border-separate">
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className="px-3">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }).map((_, index) => (
            <TableRow key={index}>
              <td className="px-3 py-2">
                <Skeleton className="h-4 w-6" />
              </td>
              <td className="px-3 py-2">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-2">
                <Skeleton className="h-4 w-64" />
              </td>
              <td className="px-3 py-2 text-right">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-3 mt-auto">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </Card>
  );
};

export default PostsTableSkeleton;
