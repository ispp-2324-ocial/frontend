import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { auth } from '@/store/auth';

const { t } = useI18n();

/**
 * Esta función se encarga de preguntar al usuario si quiere borrar su cuenta con un mensaje
 */
export async function deleteAccountMessage() : Promise<void> {
  await Swal.fire({
    title: t('deleteAccountMessageTitle'),
    text: t('deleteAccountMessageText'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#910e38',
    cancelButtonColor: '#0e4781',
    confirmButtonText: t('deleteAccountMessageConfirm'),
    cancelButtonText: t('deleteAccountMessageCancel')
  }).then(async (res) => {
    if (res.isConfirmed) {
      await Swal.fire({
        title: t('deleteAccountMessageConfirmedTitle'),
        text: t('deleteAccountMessageConfirmedText'),
        icon: 'success'
      });
      auth.logout();

      return 'Account deleted';
    } else {
      return 'Account deletion cancelled';
    }
  });
}
