import { toast } from 'vue3-toastify';

type NotificationTypes = 'warning' | 'success' | 'error' | 'info';


export const notify = (message?:string, type?: NotificationTypes): void => {
  switch (type) {
    case 'success': {
      toast.success('Success Notification !' ?? message, {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    }
    case 'error': {
      toast.error('Error Notification !' ?? message, {
        position: toast.POSITION.TOP_LEFT
      });
      break;
    }
    case 'warning': {
      toast.warn('Warning Notification !' ?? message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    }
    case 'info': {
      toast.info('Info Notification !' ?? message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      break;
    }
    default: {
      toast('Notification' ?? message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
};
