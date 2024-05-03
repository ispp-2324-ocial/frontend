import Swal from 'sweetalert2';
import { i18n } from '@/plugins/i18n';
import { auth } from '@/store/auth';
import { UsersApi } from '@/api';
import { useApi } from '@/composables/apis';

/**
 * Esta función se encarga de preguntar al usuario si quiere borrar su cuenta con un mensaje
 */
export async function deleteAccountMessage() : Promise<void> {
  const { t } = i18n;

  const alert = await Swal.fire({
    title: t('deleteAccountMessageTitle'),
    text: t('deleteAccountMessageText'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#910e38',
    cancelButtonColor: '#0e4781',
    confirmButtonText: t('deleteAccountMessageConfirm'),
    cancelButtonText: t('deleteAccountMessageCancel')
  });

  if (alert.isConfirmed) {
    await Swal.fire({
      title: t('deleteAccountMessageConfirmedTitle'),
      text: t('deleteAccountMessageConfirmedText'),
      icon: 'success'
    });
    await useApi(UsersApi, 'usersMeDeleteDestroy')();
    auth.logout();
  }
}
