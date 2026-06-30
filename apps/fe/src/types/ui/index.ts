type ToastType = 'success' | 'error' | 'warning' | 'info' | 'question';

export interface ToastActionProps {
  label: string;
  onClick: () => void;
  successLabel?: string;
}
export interface ModalProps {
  title: string;
  icon: ToastType;
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface ToastProps {
  title: string;
  icon?: ToastType;
  message: string;
  duration?: number;
  action?: ToastActionProps;
  onVoid?: () => void;
}
export interface AlertContexType {
  toast: (p: ToastProps) => void;
  modal: (p: ModalProps) => void;
  confirm: (p: ModalProps) => Promise<boolean>;
}

export interface IconPropsType {
  onClick?: () => void;
  className?: string;
}
export interface RegisterProps {
  title: string;
  icon: any;
  href: string;
}
