'use client'

import { FormContext } from '..'
import styles from './styles.module.scss'
import { useContext, useState } from 'react'

interface InputProps {
  type?: 'text' | 'password'
  name: string
  label: string
  placeholder?: string
  validate?: (value: string) => string | null // Función de validación opcional
}

export function Input({ label, name, placeholder, type = 'text', validate }: InputProps) {
  const formContext = useContext(FormContext)
  if (!formContext) {
    throw new Error('Input must be used within a FormContext.Provider')
  }

  const { formValues, setFormValues } = formContext
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))

    if (validate) {
      setError(validate(value))
    } else {
      setError(null)
    }
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
