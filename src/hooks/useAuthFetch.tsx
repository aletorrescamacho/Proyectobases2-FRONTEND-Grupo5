import NotificationContext from '@/context/NotificationContext';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface AuthFetchProps {
  endpoint: string;
  redirectRoute?: string;
  formData: any;
  options?: AxiosRequestConfig<any>;
}

export function useAuthFetch() {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const authRouter = async ({ endpoint, formData, redirectRoute, options }: AuthFetchProps) => {
    try {
      // Enviar solicitud POST con JSON
      const { data } = await axios.post(
        `https://proyectobases2-backend-grupo5-production.up.railway.app/${endpoint}`,  // URL del backend en Railway
        formData,  // Enviamos el formData directamente como JSON
        {
          headers: {
            'Content-Type': 'application/json',  // Indica que los datos se envían en formato JSON
          },
          ...options,  // Incluye cualquier opción adicional
        }
      );

      // Notificación de éxito
      showNotification({
        msj: data.message,
        open: true,
        status: 'success',
      });

      // Redirigir si se especifica una ruta de redirección
      if (redirectRoute) router.push(redirectRoute);
    } catch (error: any) {
      // Notificación de error
      showNotification({
        msj: error.response?.data?.message || 'Ocurrió un error',
        open: true,
        status: 'error',
      });
    }
  };

  return authRouter;
}
