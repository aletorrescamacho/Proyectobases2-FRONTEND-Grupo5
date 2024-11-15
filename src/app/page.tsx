/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import Navbar from './navigation/navbar'
import Footer from './footer/footer'

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }

  return (
    <div className="min-h-screen w-full bg-[#E6F7FF] flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow flex items-center justify-center w-full">
        <Form
          title='Inicia Sesión'
          onSubmit={login}
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
            description='Te olvidate tu contraseña?'
            link='/forget-password'
            textLink='Recuperar contraseña'
          />
          <Form.Footer
            description='Aun no tienes cuenta?'
            link='/register'
            textLink='Registrate'
          />
        </Form>
      </div>
      <Footer />
    </div>
  )
}
