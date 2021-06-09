import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View, Text } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { FormInput } from "../react-hook-forms/FormInput";
import Button from "../Button";

interface FormObj {
  firstname: string;
  lastname: string;
  nickname: string;
}

export default function ParentForm() {
  const formMethods = useForm();
  const navigation = useNavigation();

  const [addPlantParent, { loading, error }] = useMutation(ADD_PLANT_PARENT);
  const isMutationError = Boolean(error);
  const isMutationLoading = Boolean(loading);

  const onSubmit = (form: FormObj) => {
    const handleMutation = async (form: FormObj) => {
      const { data } = await addPlantParent({
        variables: {
          firstname: form.firstname,
          lastname: form.lastname,
          nickname: form.nickname,
        },
      });
      !isMutationLoading && !isMutationError
        ? navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Root" }],
            })
          )
        : console.log(error);
    };
    handleMutation(form);
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
        <FormInput name="nickname" label="Nick Name" returnKeyType="next" />
      </FormProvider>
      {isMutationLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Button
          title="Submit"
          onPress={formMethods.handleSubmit(onSubmit, onErrors)}
        />
      )}
      {isMutationError && <Text>{error?.message}</Text>}
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
