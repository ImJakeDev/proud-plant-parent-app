import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";

import Button from "../components/Button";
import TextInput from "../components/TextInput";

export default function BecomeAPlantParentScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <View style={styles.container}>
      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{ required: true }}
        defaultValue=""
      /> */}
      <TextInput
        control={control}
        onChangeText={value => onChange(value)}
        rules={{ required: true }}
        value={value}
      />
      {errors.firstName && <Text>First Name is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{ required: true, minLength: 8}}
        defaultValue=""
      />

      {errors.lastName?.type === "required" && <Text>Last Name is required.</Text>}

      {errors.lastName?.type === "minLength" && <Text>Minimum 8 characters are required</Text>}

      <Button title="Submit" onPress={handleSubmit((data) => console.log(data))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  }
});