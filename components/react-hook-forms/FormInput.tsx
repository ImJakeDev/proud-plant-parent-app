import * as React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import InputTypes from '../../Types/InputTypes'

// import { Input } from './Input'
import { Input } from './TextInput'

interface FormInputProps extends InputTypes {
  name: string;
  label: string;
  rules: {};
}

const ControlledInput = React.forwardRef((props:FormInputProps, forwardedRef:any) => {
  const { name, rules, defaultValue = '', ...inputProps } = props

  const formContext = useFormContext()
  
  const { control, formState: { errors } } = formContext

  const { field } = useController({ name, control, rules, defaultValue })

  return (
    <Input
      {...inputProps}
      errors={errors}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      ref={forwardedRef}
    />
  )
})

export const FormInput = React.forwardRef((props:FormInputProps, forwardedRef:any) => {
  const { name, ...inputProps } = props
  const formContext = useFormContext()

  if (!formContext || !name) {
    const errorMessage = !name
      ? 'Form field must have a "name" prop!'
      : 'Form field must be a descendant of `FormProvider` as it uses `useFormContext`!'
    return <Input {...inputProps} errors={errorMessage} editable={false} />
  }

  return <ControlledInput {...props} ref={forwardedRef} />
})