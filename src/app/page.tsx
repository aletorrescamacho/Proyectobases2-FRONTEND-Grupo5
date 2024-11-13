'use client'

import { Form, FormValues } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading();

    try {
      await authFetch({
        endpoint: 'users/login', // Cambia esto al endpoint correcto de tu backend
        formData,
        redirectRoute: '/home', // Ruta a la que quieres redirigir después de un registro exitoso
      });
    } catch (error) {
      console.error('Error en el Inicio de Sesion', error);
    } finally {
      finishLoading();
    }
  };

  const handleSubmit = (values: FormValues) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
  
    login(formData);
  };

  return (
    <>
      <Form
        title='Inicia Sesión'
        onSubmit={handleSubmit}
        description='Formulario para iniciar sesión'
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
          />
          <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Iniciar Sesión' isLoading={isLoading} />
        <Form.Footer
          description='Olvidaste tu contraseña?'
          link='/forget-password'
          textLink='Recuperar contraseña'
        />
        <Form.Footer
          description='Aun no tienes cuenta?'
          link='/register'
          textLink='Registrate'
        />
      </Form>
    </>
  )
}
