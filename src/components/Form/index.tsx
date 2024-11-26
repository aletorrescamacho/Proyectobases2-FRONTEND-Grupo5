'use client'

import { Footer, Input, SubmitButton } from '@/components/Form/components'
import { createContext, useState } from 'react'
import styles from './styles.module.scss'

export type FormValues = Record<string, string>

interface FormContextType {
  formValues: FormValues
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

interface FormProps {
  title: string
  description?: string
  onSubmit: (values: FormValues) => void
  children: React.ReactNode
}

// Inicializa el contexto con un valor vacío en lugar de `undefined`
export const FormContext = createContext<FormContextType>({
  formValues: {},
  setFormValues: () => {},
})

export function Form({ title, children, onSubmit, description }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({})

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formValues)
  }

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.descriptionContainer}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  )
}

// Exporta subcomponentes
Form.Input = Input
Form.Footer = Footer
Form.SubmitButton = SubmitButton
