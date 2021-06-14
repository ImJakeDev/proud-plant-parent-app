import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View, Text } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { ActionType } from "../../global/state-management/actions/Index";
import { useProudPlantParent } from "../../global/proudPlantParentContext";
import { FormInput } from "../react-hook-forms/FormInput";
import Button from "../Button";

interface IForm {
  familyname: string;
  plantparentid: number;
}

export default function FamilyForm() {
  const formMethods = useForm();
  const navigation = useNavigation();

  const {
    dispatch,
    state: {
      plantparent: { plantparentid },
    },
  } = useProudPlantParent();

  const [addPlantFamily, { loading, error }] = useMutation(ADD_PLANT_FAMILY);
  const isMutationError = Boolean(error);
  const isMutationLoading = Boolean(loading);

  const onSubmit = (form: IForm) => {
    // console.log("Form object", form);
    console.log("What is the plant parent id:", plantparentid);

    const handleMutation = async (form: IForm) => {
      const { data } = await addPlantFamily({
        variables: {
          familyname: form.familyname,
          plantparentid: plantparentid,
        },
      });

      const stateObj = data.insert_plantfamily.returning[0];
      // console.log("State Obj from response return:", stateObj);

      const payload = { ...stateObj };
      // console.log("New payload obj:", payload);

      dispatch({ type: ActionType.ADD_PLANT_FAMILY, payload: payload });

      !isMutationLoading && !isMutationError
        ? navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Root" }],
            })
          )
        : console.error("This is the error:", error);
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
          name="familyname"
          label="Family Name"
          rules={{ required: "Family Name is required!" }}
        />
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

const ADD_PLANT_FAMILY = gql`
  mutation ($familyname: String!, $plantparentid: Int!) {
    insert_plantfamily(
      objects: { familyname: $familyname, plantparentid: $plantparentid }
    ) {
      returning {
        becamefamily
        familyname
        plantfamilyid
        plantparentid
      }
    }
  }
`;
