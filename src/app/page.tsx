'use client';

import { Form, FormValues } from '@/components/Form';
import { useLoading } from '@/hooks/useLoading';
import { useState } from 'react';

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const login = async (formData: any) => {
    startLoading();
    try {
      const response = await fetch(
        'https://proyectobases2-backend-grupo5-production.up.railway.app/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      }

      const data = await response.json();

      if (data.user?.userId) {
        localStorage.setItem('userId', data.user.userId.low.toString());
      }

      window.location.href = '/home';
    } catch (error) {
      console.error('Error en el Inicio de Sesión', error);
    } finally {
      finishLoading();
    }
  };

  const handleSubmit = (values: FormValues) => {
    const newErrors: { email?: string; password?: string } = {};

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Por favor, ingresa un correo válido.';
    }

    if (!values.password || values.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login(values);
  };

  return (
    <Form
      title="Inicia Sesión"
      onSubmit={handleSubmit}
      description="Formulario para iniciar sesión"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          label="Correo"
          name="email"
          placeholder="Ingresa tu correo..."
          error={errors.email}
        />
        <Form.Input
          placeholder="Ingresa tu contraseña..."
          label="Contraseña"
          name="password"
          type="password"
          error={errors.password}
        />
      </div>
      <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading} />
      <Form.Footer
        description="Olvidaste tu contraseña?"
        link="/forget-password"
        textLink="Recuperar contraseña"
      />
      <Form.Footer
        description="Aun no tienes cuenta?"
        link="/register"
        textLink="Registrate"
      />
    </Form>
  );
}
