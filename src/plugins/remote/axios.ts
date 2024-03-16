/**
 * Crea la instancia de Axios que se utiliza para la API y los requests
 */
import axios from 'axios';

/**
 * TODO: Añadir aquí un interceptor por si es necesario llamar al logout
 * al recibir error 401 (Unauthorized).
 */
class RemotePluginAxios {
  public readonly instance = axios.create();

  public readonly setToken = (token?: string): void => {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  };
}

const RemotePluginAxiosInstance = new RemotePluginAxios();

export default RemotePluginAxiosInstance;
