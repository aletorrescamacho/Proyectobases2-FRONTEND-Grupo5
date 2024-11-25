/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Form, FormValues } from '@/components/Form'
import { useLoading } from '@/hooks/useLoading'
import Footer from './footer/footer'
import './page.css'

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()

  const login = async (formData: any) => {
    startLoading()
    try {
      const response = await fetch('https://proyectobases2-backend-grupo5-production.up.railway.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión')
      }

      const data = await response.json()

      // Guarda el userId en localStorage si la respuesta contiene los datos esperados
      if (data.user?.userId) {
        localStorage.setItem('userId', data.user.userId.low.toString()); // Almacena solo el valor de `low` como cadena 
      }

      // Redirige a /home si el inicio de sesión es exitoso
      window.location.href = '/home'
    } catch (error) {
      console.error('Error en el Inicio de Sesión', error)
    } finally {
      finishLoading()
    }
  }

  const handleSubmit = (values: FormValues) => {
    const formData = {
      email: values.email,
      password: values.password,
    }
    login(formData)
  }

  return (
    <>
    <div className='main-body'>
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
        <Footer/>
    </div>
    
    </>
  )
}

  