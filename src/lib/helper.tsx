import { toast } from "react-toastify";

export const notification = (msg:string, type = "info") => {
    if (["success", "error", "info"].includes(type)) {
      toast[type](msg, { toastId: `${type}-${msg}` });
    } else {
      console.error("Invalid notification type:", type);
      toast.info(msg); 
    }
  };
  