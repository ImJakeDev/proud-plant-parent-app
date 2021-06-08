import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { FormInput } from "../react-hook-forms/FormInput";
import Button from "../Button";

export default function ParentForm() {
  const formMethods = useForm();
  const navigation = useNavigation();
  const [addPlantParent, { error: mutationError }] =
    useMutation(ADD_PLANT_PARENT);
  const isMutationError = Boolean(mutationError);

  const onSubmit = (form: any) => {
    console.log(form);
    addPlantParent({
      variables: {
        firstname: form.firstname,
        lastname: form.lastname,
        nickname: form.nickname,
      },
    });
    !isMutationError
      ? navigation.navigate("Welcome")
      : console.log(mutationError);
  };

  const onErrors = (errors: {}) => {
    console.warn(errors);
  };

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormInput
          name="firstname"
          label="First Name"
          rules={{ required: "First Name is required!" }}
          returnKeyType="next"
        />
        <FormInput
          name="lastname"
          label="Last Name"
          rules={{ required: "Last Name is required!" }}
          returnKeyType="next"
        />
        <FormInput
          name="nickname"
          label="Nick Name"
          returnKeyType="next"
        />
      </FormProvider>
      <Button
        title="Submit"
        onPress={formMethods.handleSubmit(onSubmit, onErrors)}
      />
    </View>
  );
}

const ADD_PLANT_PARENT = gql`
  mutation ($firstname: String!, $lastname: String!, $nickname: String!) {
    insert_plantparent(
      objects: {
        firstname: $firstname
        lastname: $lastname
        nickname: $nickname
      }
    ) {
      returning {
        firstname
        lastname
        nickname
        plantparentid
        timeofparenthood
      }
    }
  }
`;
