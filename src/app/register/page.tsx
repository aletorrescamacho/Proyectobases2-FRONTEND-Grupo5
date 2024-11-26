'use client'
import { Form, FormValues } from '@/components/Form'
import { useLoading } from '@/hooks/useLoading'
import Footer from '../footer/footer'

export default function RegisterPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()

  const register = async (formData: any) => {
    startLoading()
    try {
      const response = await fetch(
        'https://proyectobases2-backend-grupo5-production.up.railway.app/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Error en la solicitud de registro')
      }

      const data = await response.json()

      // Guarda el userId en localStorage si la respuesta contiene los datos esperados
      if (data.user?.userId) {
        localStorage.setItem('userId', data.user.userId.low.toString()) // Almacena solo el valor de `low` como cadena
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordMinLength = 8

    // Validaciones específicas
    if (!values.username) {
      alert('El nombre de usuario es obligatorio.')
      return
    }

    if (!values.firstName) {
      alert('El nombre es obligatorio.')
      return
    }

    if (!values.lastName) {
      alert('El apellido es obligatorio.')
      return
    }

    if (!emailRegex.test(values.email)) {
      alert('Por favor ingresa un correo válido.')
      return
    }

    if (!values.gender) {
      alert('El género es obligatorio.')
      return
    }

    if (!values.date_of_birth) {
      alert('La fecha de nacimiento es obligatoria.')
      return
    }

    if (values.password.length < passwordMinLength) {
      alert(`La contraseña debe tener al menos ${passwordMinLength} caracteres.`)
      return
    }

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
    <><Form
      title="Regístrate"
      onSubmit={handleSubmit}
      description="Formulario para registrar un nuevo usuario"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          label="Username"
          name="username"
          placeholder="Ingresa tu nombre de usuario..."
          validate={(value) => value ? null : 'El nombre de usuario es obligatorio'} />
        <Form.Input
          label="Nombre"
          name="firstName"
          placeholder="Ingresa tu nombre..."
          validate={(value) => (value ? null : 'El nombre es obligatorio')} />
        <Form.Input
          label="Apellido"
          name="lastName"
          placeholder="Ingresa tu apellido..."
          validate={(value) => (value ? null : 'El apellido es obligatorio')} />
        <Form.Input
          label="Correo"
          name="email"
          placeholder="Ingresa tu correo..."
          validate={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : 'Por favor ingresa un correo válido'} />
        <Form.Input
          label="Género"
          name="gender"
          placeholder="Ingresa tu género..."
          validate={(value) => (value ? null : 'El género es obligatorio')} />
        <Form.Input
          label="Fecha de nacimiento"
          name="date_of_birth"
          placeholder="Selecciona tu fecha de nacimiento..."
          validate={(value) => value ? null : 'La fecha de nacimiento es obligatoria'} />
        <Form.Input
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña..."
          type="password"
          validate={(value) => value.length >= 8
            ? null
            : 'La contraseña debe tener al menos 8 caracteres'} />
      </div>
      <Form.SubmitButton buttonText="Registrarse" isLoading={isLoading} />
      <Form.Footer
        description="¿Ya tienes una cuenta?"
        link="/"
        textLink="Inicia sesión" />
    </Form><Footer /></>
    
  )
}
