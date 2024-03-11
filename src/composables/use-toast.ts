import { toast } from 'vue3-toastify';
import { i18n } from '@/plugins/i18n';
import 'vue3-toastify/dist/index.css';

type NotificationTypes = 'warning' | 'success' | 'error' | 'info';

/**
 * Muestra una notificación en la aplicación
 */
export function useToast(message?: string, type?: NotificationTypes): void {
  const { t } = i18n;

  switch (type) {
    case 'success': {
      toast.success(message ?? t('¡Notificación Exitosa!') , {
        position: toast.POSITION.TOP_CENTER
      });
      break;
    }
    case 'error': {
      toast.error(message ?? t('¡Notificación de Errónea!'), {
        position: toast.POSITION.TOP_LEFT
      });
      break;
    }
    case 'warning': {
      toast.warn(message ?? t('¡Notificación de Advertencia!'), {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    }
    case 'info': {
      toast.info(message ?? t('¡Notificación de Información!'), {
        position: toast.POSITION.BOTTOM_CENTER
      });
      break;
    }
    default: {
      toast(message ?? t('Notificación'), {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
}
