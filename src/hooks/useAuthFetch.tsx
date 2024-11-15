import { useContext } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { NotificationContext } from '@/context/NotificationContext';


interface AuthFetchProps {
  endpoint: string;
  redirectRoute?: string;
  formData?: any; // Datos opcionales para POST
  options?: AxiosRequestConfig<any>;
}

export interface AuthFetchResponse {
  trackName?: string;
  artistName?: string;
  // Agrega otros campos necesarios
}

export function useAuthFetch() {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const authRouter = async ({ endpoint, formData, redirectRoute, options }: AuthFetchProps): Promise<any> => {
    try {
      const url = `https://proyectobases2-backend-grupo5-production.up.railway.app/${endpoint}`;

      // Determina si se usa GET o POST en base a la existencia de formData
      const { data } = formData
        ? await axios.post(url, formData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            ...options,
          })
        : await axios.get(url, {
          withCredentials: true,
            ...options,
          });

      // Notificación de éxito (opcional, solo si necesitas mostrar mensajes)
      showNotification({
        msj: data.message || 'Solicitud completada con éxito',
        open: true,
        status: 'success',
      });

      // Redirigir si se especifica una ruta de redirección
      if (redirectRoute) router.push(redirectRoute);

      return data;
    } catch (error: any) {
      // Notificación de error
      showNotification({
        msj: error.response?.data?.message || 'Ocurrió un error',
        open: true,
        status: 'error',
      });
      throw error;
    }
  };

  return authRouter;
}
