import { toast } from 'vue3-toastify';


export const notify = (type: string) => {
  switch (type) {
    case 'default':
      toast("Default Notification !");
      break;
    case 'success':
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER,
      });
      break;
    case 'error':
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT,
      });
      break;
    case 'warning':
      toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      break;
    case 'info':
      toast.info("Info Notification !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      break;
    default:
      toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  }
};