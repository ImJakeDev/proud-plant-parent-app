import * as React from 'react'
import styled from 'styled-components/native'
import { ErrorMessage } from '@hookform/error-message';

interface InputProps {
  label: string;
  errors: {};
  isError: boolean
}

const COLORS = {
  white: '#FFFFFF',
  gray: '#AAAAAA',
  red: '#FF5555',
}

const Wrapper = styled.View`
  margin-bottom: 15px;
`

const StyledInput = styled.TextInput<InputProps>`
  border-color: ${(props) => (props.isError ? COLORS.red : COLORS.gray)};
  border-width: 1px;
  width: 300px;
  height: 50px;
`

const Label = styled.Text`
  color: ${COLORS.gray};
  font-size: 20px;
  letter-spacing: 2px;
`

const Error = styled.Text`
  color: ${COLORS.red};
`

export const Input = React.forwardRef((props:InputProps, forwardedRef) => {
  const { label, errors, ...textInputProps } = props

  return (
    <Wrapper>
      {Boolean(label) && <Label>{label}</Label>}
      <StyledInput {...textInputProps} ref={forwardedRef} />
      <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => <Error>{message}</Error>}
      />
    </Wrapper>
  )
})