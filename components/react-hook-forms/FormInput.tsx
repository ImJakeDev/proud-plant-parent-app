import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Input } from "./Input";

const ControlledInput = React.forwardRef(
  (props, forwardedRef) => {
    const { name, rules, defaultValue = "", ...inputProps } = props;
    const { required } = rules;
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
        isRequired={Boolean(required)}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        ref={forwardedRef}
      />
    );
  }
);

export const FormInput = React.forwardRef(
  (props, forwardedRef) => {
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
