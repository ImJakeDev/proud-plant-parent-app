import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { gql, useMutation } from '@apollo/client';

import { FormInput } from "../react-hook-forms/FormInput";
import Button from "../Button";

const ADD_PLANT_PARENT = gql`
  mutation ($firstname: String!, $lastname: String!, $nickname: String! ) {
    insert_plantparent(objects: {firstname: $firstname, lastname: $lastname, nickname: $nickname}) {
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

export default function ParentForm() {
  const formMethods = useForm();

  const [addPlantParent] = useMutation(ADD_PLANT_PARENT);

  const onSubmit = (form: any) => {
    console.log(form);
    addPlantParent({ variables: { firstname: form.firstname, lastname: form.lastname, nickname: form.nickname } });
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
          rules={{ required: "Nick Name is required!" }}
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
