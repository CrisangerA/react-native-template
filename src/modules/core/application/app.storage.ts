import { create } from 'zustand';
import type {
  ModalOpenParams,
  ToastPosition,
  ToastShowParams,
  ToastType,
} from '../domain/app.model';

interface State {
  modal: {
    visible: boolean;
    entityName: string;
    entityType: string;
    onConfirm: (() => Promise<void>) | null;
    open: (params: ModalOpenParams) => void;
    close: () => void;
  };
  toast: {
    visible: boolean;
    message: string;
    type: ToastType;
    duration: number;
    position: ToastPosition;
    show: (params: ToastShowParams) => void;
    hide: () => void;
  };
}

const initialState: State = {
  modal: {
    visible: false,
    entityName: '',
    entityType: '',
    onConfirm: null,
    open: () => {},
    close: () => {},
  },
  toast: {
    visible: false,
    message: '',
    type: 'info',
    duration: 3000,
    position: 'bottom',
    show: () => {},
    hide: () => {},
  },
};

export const useAppStorage = create<State>()(set => ({
  ...initialState,
  modal: {
    ...initialState.modal,
    close: () =>
      set(state => ({
        modal: {
          ...state.modal,
          visible: false,
          entityName: '',
          entityType: '',
          onConfirm: null,
        },
      })),
    open: ({ entityName, entityType, onConfirm }: ModalOpenParams) =>
      set(state => ({
        modal: {
          ...state.modal,
          visible: true,
          entityName,
          entityType,
          onConfirm,
        },
      })),
  },
  toast: {
    ...initialState.toast,
    show: ({
      message,
      type,
      duration = initialState.toast.duration,
      position = initialState.toast.position,
    }: ToastShowParams) =>
      set(state => ({
        toast: {
          ...state.toast,
          visible: true,
          message,
          type,
          duration,
          position,
        },
      })),
    hide: () =>
      set(state => ({
        toast: {
          ...state.toast,
          visible: false,
          message: '',
          type: initialState.toast.type,
          duration: initialState.toast.duration,
          position: initialState.toast.position,
        },
      })),
  },
}));
