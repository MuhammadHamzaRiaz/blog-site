import { IPaginationConfig, IPaginationReturn } from "@/lib/interface";
import { useState, useCallback, useMemo } from "react";

export const usePagination = ({
  totalItems,
  initialPage = 1,
  itemsPerPage = 10,
  maxVisiblePages = 5,
  onPageChange,
}: IPaginationConfig): IPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(
    Math.max(1, Math.min(initialPage, Math.ceil(totalItems / itemsPerPage)))
  );
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / currentItemsPerPage));

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * currentItemsPerPage;
  const endIndex = Math.min(startIndex + currentItemsPerPage, totalItems);

  const hasNextPage = safePage < totalPages;
  const hasPreviousPage = safePage > 1;

  const visiblePages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const sidePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, safePage - sidePages);
      let endPage = Math.min(totalPages, safePage + sidePages);
      if (safePage <= sidePages + 1) {
        endPage = Math.min(totalPages, maxVisiblePages);
      } else if (safePage >= totalPages - sidePages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("ellipsis");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("ellipsis");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  }, [safePage, totalPages, maxVisiblePages]);

  const goToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        onPageChange?.(newPage);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  const goToNext = useCallback(() => {
    if (hasNextPage) {
      goToPage(safePage + 1);
    }
  }, [hasNextPage, safePage, goToPage]);

  const goToPrevious = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(safePage - 1);
    }
  }, [hasPreviousPage, safePage, goToPage]);

  const goToFirst = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLast = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  const setItemsPerPage = useCallback(
    (items: number) => {
      const newItemsPerPage = Math.max(1, items);
      setCurrentItemsPerPage(newItemsPerPage);

      const newPage = Math.max(1, Math.ceil((startIndex + 1) / newItemsPerPage));
      const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
      const adjustedPage = Math.min(newPage, newTotalPages);

      setCurrentPage(adjustedPage);
      onPageChange?.(adjustedPage);
    },
    [startIndex, totalItems, onPageChange]
  );

  const getPageItems = useCallback(
    <T>(items: T[]): T[] => {
      return items?.slice(startIndex, endIndex);
    },
    [startIndex, endIndex]
  );

  return {
    currentPage: safePage,
    totalPages,
    totalItems,
    itemsPerPage: currentItemsPerPage,
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
    getPageItems,
  };
};
