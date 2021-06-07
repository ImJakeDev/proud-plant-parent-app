import React, { useCallback, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { FormInput } from '../react-hook-forms/FormInput'
import Button from '../Button'

export default function ParentForm() {
  const formMethods = useForm()
  const passwordRef = useRef()

  const onSubmit = (form:any) => {
    console.log(form)
  }

  const onErrors = (errors:{}) => {
    console.warn(errors)
  }

  const focusPassword = useCallback(() => passwordRef?.current?.focus(), [
    passwordRef,
  ])

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormInput
          name="UserName"
          label='Username'
          rules={{ required: 'Username is required!' }}
          onSubmitEditing={focusPassword}
          returnKeyType='next'
        />
        <FormInput
          name="Password"
          label='Password'
          rules={{
            required: 'Password is required!',
            minLength: {
              message: 'Use at least 10 characters.',
              value: 10,
            },
          }}
          ref={passwordRef}
        />
      </FormProvider>
      <Button
        title='Login'
        onPress={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  )
}