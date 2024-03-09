import { toast } from 'vue3-toastify';

type NotificationTypes = 'warning' | 'success' | 'error' | 'info';


export const notify = (message?:string, type?: NotificationTypes): void => {
  switch (type) {
    case 'success': {
      toast.success(message ?? 'Success Notification !' , {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    }
    case 'error': {
      toast.error(message ?? 'Error Notification !', {
        position: toast.POSITION.TOP_LEFT
      });
      break;
    }
    case 'warning': {
      toast.warn(message ?? 'Warning Notification !', {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    }
    case 'info': {
      toast.info(message ?? 'Info Notification !', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      break;
    }
    default: {
      toast(message ?? 'Notification', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
};
