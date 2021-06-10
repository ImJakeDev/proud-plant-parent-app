import * as React from "react";
import {
  useController,
  useFormContext,
  Message,
  ValidationRule,
} from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "./Input";

interface FormInputProps extends TextInputProps {
  name: string;
  label?: string;
  rules?: RegisterOptions;
}

export type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
}>;

const ControlledInput = React.forwardRef(
  (props: FormInputProps, forwardedRef: any) => {
    const { name, rules, defaultValue = "", ...inputProps } = props;

    const isRequired = Boolean(rules?.required);

    const formContext = useFormContext();

    const {
      control,
      formState: { errors },
    } = formContext;

    const { field } = useController({ name, control, rules, defaultValue });

    return (
      <Input
        {...inputProps}
        name={name}
        errors={errors}
        isRequired={isRequired}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        ref={forwardedRef}
      />
    );
  }
);

export const FormInput = React.forwardRef(
  (props: FormInputProps, forwardedRef: any) => {
    const { name, ...inputProps } = props;
    const formContext = useFormContext();

    if (!formContext || !name) {
      const errorMessage = !name
        ? 'Form field must have a "name" prop!'
        : "Form field must be a descendant of `FormProvider` as it uses `useFormContext`!";
      return (
        <Input
          {...inputProps}
          name={name}
          errors={errorMessage}
          editable={false}
        />
      );
    }

    return <ControlledInput {...props} ref={forwardedRef} />;
  }
);
