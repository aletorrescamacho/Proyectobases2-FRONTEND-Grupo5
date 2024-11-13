'use client'

import { Form, FormValues } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function RegisterPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading();

    try {
      await authFetch({
        endpoint: 'users/register', // Cambia esto al endpoint correcto de tu backend
        formData,
        redirectRoute: '/home', // Ruta a la que quieres redirigir después de un registro exitoso
      });
    } catch (error) {
      console.error('Error en el registro:', error);
    } finally {
      finishLoading();
    }
  };

  const handleSubmit = (values: FormValues) => {
    const formData = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender,
      date_of_birth: values.date_of_birth,
      password: values.password,
    };
  
    register(formData);
  };
  

  return (
    <Form
      title="Regístrate"
      onSubmit={handleSubmit}
      description="Formulario para registrar un nuevo usuario"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input label="Username" name="username" placeholder="Ingresa tu nombre de usuario..." />
        <Form.Input label="Nombre" name="firstName" placeholder="Ingresa tu nombre..." />
        <Form.Input label="Apellido" name="lastName" placeholder="Ingresa tu apellido..." />
        <Form.Input label="Correo" name="email" placeholder="Ingresa tu correo..." />
        <Form.Input label="Género" name="gender" placeholder="Ingresa tu género..." />
        <Form.Input label="Fecha de nacimiento" name="date_of_birth" placeholder="Selecciona tu fecha de nacimiento..."  />
        <Form.Input label="Contraseña" name="password" placeholder="Ingresa tu contraseña..." type="password" />
      </div>
      <Form.SubmitButton buttonText="Registrarse" isLoading={isLoading} />
      <Form.Footer description="¿Ya tienes una cuenta?" link="/login" textLink="Inicia sesión" />
    </Form>
  );



  }

  