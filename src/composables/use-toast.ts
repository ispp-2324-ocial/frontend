import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';

type NotificationTypes = 'warning' | 'success' | 'error' | 'info';

export const notify = (message?:string, type?: NotificationTypes): void => {
  const { t } = useI18n();
  switch (type) {
    case 'success': {
      toast.success(message ?? t('Success Notification !') , {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    }
    case 'error': {
      toast.error(message ?? t('Error Notification !'), {
        position: toast.POSITION.TOP_LEFT
      });
      break;
    }
    case 'warning': {
      toast.warn(message ?? t('Warning Notification !'), {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    }
    case 'info': {
      toast.info(message ?? t('Info Notification !'), {
        position: toast.POSITION.BOTTOM_CENTER
      });
      break;
    }
    default: {
      toast(message ?? t('Notification'), {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
};
