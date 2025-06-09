import * as Icons from "lucide-react";

export interface ITableColumn {
  id: number;
  name: string;
  classes: string;
}

export interface ILoadingState {
  update: boolean;
  delete: boolean;
  create: boolean;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IEditPostFormValues {
  title: string;
  body: string;
}

export interface IPostTableRowProps {
  index: number;
  title: string;
  body: string;
  onDelete: () => void;
  onEdit: () => void;
}

export interface IDeletePostDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitLoading: boolean;
}

export interface IPostFormDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  onSubmit: (data: IEditPostFormValues) => void;
  submitLoading: boolean;
  mode: "create" | "edit";
  initialData?: IPost;
  onClose?: () => void;
}
export interface IPaginationReturn {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  visiblePages: (number | "ellipsis")[];
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  setItemsPerPage: (items: number) => void;
  getPageItems: <T>(items: T[]) => T[];
}
export interface ITablePaginationProps {
  pagination: IPaginationReturn;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  showInfo?: boolean;
  showFirstLast?: boolean;
  showGoToFirst?: boolean;
  showGoToLast?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export interface IPaginationConfig {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
  maxVisiblePages?: number;
  onPageChange?: (page: number) => void;
}

export interface ITextEditorProps {
  id: string;
  content: string;
  onChange: (value: string) => void;
}

type IconName = keyof typeof Icons;
export interface ISiteNavItem {
  id: number;
  name: string;
  link: string;
  disabled: boolean;
}

export interface IDashboardNavItem extends ISiteNavItem {
  icon: IconName;
}
