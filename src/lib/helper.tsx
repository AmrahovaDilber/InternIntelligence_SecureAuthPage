import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info";

export const notification = (msg: string, type: ToastType = "info") => {
  const toastMethods: Record<ToastType, (msg: string, options?: { toastId: string }) => void> = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
  };

  if (type in toastMethods) {
    toastMethods[type](msg, { toastId: `${type}-${msg}` });
  } else {
    console.error("Invalid notification type:", type);
    toast.info(msg, { toastId: `info-${msg}` });
  }
};
