import * as React from "react";
import { StyleSheet, View, TextInput, Text, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  name?: string;
  errors?: {};
  isRequired?: boolean;
}

export const Input = React.forwardRef(
  (props:InputProps, forwardedRef) => {
    const { label, name, errors, isRequired, ...textInputProps } = props;

    const isError = Boolean(Object.entries(errors).length > 0);
    const isLabel = Boolean(label);

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          {isLabel && <Text style={styles.label}>{label}</Text>}
          {isRequired && <Text style={{ color: "red" }}>*</Text>}
        </View>
        <TextInput
          {...textInputProps}
          ref={forwardedRef}
          style={[styles.input, { borderColor: isError ? "red" : "gray" }]}
        />
        {isError && (
          <Text style={styles.error}>
            {Object.entries(errors).map((item: any) => {
              return item[0] === name && item[1].message;
            })}
          </Text>
        )}
      </View>
    );
  }
);

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
  },
  error: {
    color: "red",
  },
});
