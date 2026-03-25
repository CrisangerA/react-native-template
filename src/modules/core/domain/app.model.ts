export type ModalOpenParams = {
  entityName: string;
  entityType: string;
  onConfirm: () => Promise<void>;
};

export type ToastType = 'success' | 'error' | 'info';
export type ToastPosition = 'top' | 'bottom';

export type ToastShowParams = {
  message: string;
  type: ToastType;
  duration?: number;
  position?: ToastPosition;
};
