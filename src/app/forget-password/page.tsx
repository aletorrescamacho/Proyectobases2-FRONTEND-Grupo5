
'use client'

import { Form, FormValues } from '@/components/Form'
import { useLoading } from '@/hooks/useLoading'
import './page.css'

export default function ForgetPasswordPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()

  const sendRecoveryEmail = async (formData: any) => {
    startLoading()
    try {
      const response = await fetch(
        'https://proyectobases2-backend-grupo5-production.up.railway.app/users/forget-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Error al enviar el correo de recuperación')
      }

      alert(
        'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.'
      )
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error)
      alert('Hubo un problema al procesar tu solicitud. Inténtalo más tarde.')
    } finally {
      finishLoading()
    }
  }

  const handleSubmit = (values: FormValues) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(values.email)) {
      alert('Por favor ingresa un correo válido.')
      return
    }

    const formData = {
      email: values.email,
    }

    sendRecoveryEmail(formData)
  }

  return (
    <div className='main-body'>
      <Form
        title='Recuperar Contraseña'
        onSubmit={handleSubmit}
        description='Ingresa tu correo electrónico para recuperar tu contraseña'
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
            validate={(value) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? null
                : 'Correo no válido'
            }
          />
        </div>
        <Form.SubmitButton
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />
      </Form>
    </div>
  )
}
