// components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// icons
import { ChevronFirst, ChevronLast } from "lucide-react";
// interface
import { ITablePaginationProps } from "@/lib/interface";

const TablePagination = ({
  pagination,
  showPageSizeSelector = true,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showInfo = true,
  showFirstLast = true,
  showGoToFirst = false,
  showGoToLast = false,
  className = "",
  size = "md",
  variant = "default",
}: ITablePaginationProps) => {
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    visiblePages,
    goToPage,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    setItemsPerPage,
  } = pagination;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const buttonSizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  if (totalPages <= 1 && !showInfo && !showPageSizeSelector) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {showPageSizeSelector && (
        <div className="flex items-center gap-2">
          <span className={`text-muted-foreground ${sizeClasses[size]}`}>Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(parseInt(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className={`text-muted-foreground ${sizeClasses[size]}`}>per page</span>
        </div>
      )}
      {showInfo && (
        <div className={`text-muted-foreground ${sizeClasses[size]} order-first sm:order-none`}>
          {totalItems === 0 ? (
            "No items"
          ) : (
            <>
              Showing {startIndex + 1} to {endIndex} of {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}
            </>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {showGoToFirst && (
            <Button
              variant={variant}
              size="sm"
              className={buttonSizes[size]}
              onClick={goToFirst}
              disabled={!hasPreviousPage}
              aria-label="Go to first page"
            >
              <ChevronFirst className="h-4 w-4" />
            </Button>
          )}

          <Pagination>
            <PaginationContent>
              {showFirstLast && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={goToPrevious}
                    className={`cursor-pointer ${
                      !hasPreviousPage ? "pointer-events-none opacity-50" : ""
                    }`}
                    aria-disabled={!hasPreviousPage}
                  />
                </PaginationItem>
              )}
              {visiblePages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => goToPage(page)}
                      isActive={page === currentPage}
                      className="cursor-pointer"
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              {showFirstLast && (
                <PaginationItem>
                  <PaginationNext
                    onClick={goToNext}
                    className={`cursor-pointer ${
                      !hasNextPage ? "pointer-events-none opacity-50" : ""
                    }`}
                    aria-disabled={!hasNextPage}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
          {showGoToLast && (
            <Button
              variant={variant}
              size="sm"
              className={buttonSizes[size]}
              onClick={goToLast}
              disabled={!hasNextPage}
              aria-label="Go to last page"
            >
              <ChevronLast className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TablePagination;
