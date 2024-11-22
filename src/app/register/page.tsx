'use client'
import { Form, FormValues } from '@/components/Form'
import { useLoading } from '@/hooks/useLoading'

export default function RegisterPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()

  const register = async (formData: any) => {
    startLoading()
    try {
      const response = await fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de registro')
      }

      const data = await response.json()

      // Guarda el userId en localStorage si la respuesta contiene los datos esperados
      if (data.user?.userId) {
        localStorage.setItem('userId', data.user.userId.low.toString()); // Almacena solo el valor de `low` como cadena // Convierte el objeto en una cadena JSON
      }

      // Redirige a /home si el registro es exitoso
      window.location.href = '/home'
    } catch (error) {
      console.error('Error en el registro:', error)
    } finally {
      finishLoading()
    }
  }

  const handleSubmit = (values: FormValues) => {
    const formData = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      gender: values.gender,
      date_of_birth: values.date_of_birth,
      password: values.password,
    }
    register(formData)
  }
  

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

  