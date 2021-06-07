import * as React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { ErrorMessage } from '@hookform/error-message';

interface InputProps {
  label: string;
  name: string;
  errors: {};
}

export const Input = React.forwardRef((props:InputProps, forwardedRef:any) => {
  const { label, name, errors, ...textInputProps } = props
  const isError = Boolean(errors)
  const isLabel = Boolean(label)

  return (
    <View style={styles.container}>
      {isLabel && <Text style={styles.label}>{label}</Text>}
      <TextInput {...textInputProps} ref={forwardedRef} style={[styles.input, { borderColor: isError ? "red" : "gray", }]}/>
      <ErrorMessage
        errors={errors}
        name={name + "Error" || "Text Error"}
        render={({ message }) => <Text>{message}</Text>}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    width: 250,
    height: 50,
  },
  label: {
    fontSize: 20,
  }
});