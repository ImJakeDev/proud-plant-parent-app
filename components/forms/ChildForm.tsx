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
  plantname: string;
  plantfamilyid: number;
}

export default function ChildForm() {
  const formMethods = useForm();
  const navigation = useNavigation();

  const {
    dispatch,
    state: {
      plantfamily: { plantfamilyid },
    },
  } = useProudPlantParent();

  const [addPlantChild, { loading, error }] = useMutation(ADD_PLANT_CHILD);
  const isMutationError = Boolean(error);
  const isMutationLoading = Boolean(loading);

  const onSubmit = (form: IForm) => {
    const handleMutation = async (form: IForm) => {
      const { data } = await addPlantChild({
        variables: {
          plantname: form.plantname,
          plantfamilyid: plantfamilyid,
        },
      });

      const stateObj = data.insert_plantchild.returning[0];
      console.log("State Obj from response return:", stateObj);

      const payload = { ...stateObj };
      console.log("New payload obj:", payload);

      dispatch({ type: ActionType.ADD_PLANT_CHILD, payload: payload });

      !isMutationLoading && !isMutationError
        ? navigation.goBack()
        : console.error(error);
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
          name="plantname"
          label="Plant Name"
          rules={{ required: "Plant Name is required!" }}
          returnKeyType="next"
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

const ADD_PLANT_CHILD = gql`
  mutation ($plantname: String!, $plantfamilyid: Int!) {
    insert_plantchild(
      objects: { plantname: $plantname, plantfamilyid: $plantfamilyid }
    ) {
      returning {
        age
        dateofbirth
        joinedfamilyat
        plantdetails
        plantfamilyid
        plantgenus
        plantname
        plantprofileid
        plantspecies
        scientificname
      }
    }
  }
`;
