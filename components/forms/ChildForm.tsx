import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View, Text } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../../global/state-management/context/index";
import { ActionType } from "../../global/state-management/actions/Index";
import { FormInput } from "../react-hook-forms/FormInput";
import { ILocalState } from "../AddPlantChild";
import Button from "../Button";

interface IForm {
  plantnickname?: string;
}

interface IChildForm {
  localState: ILocalState;
}

export default function ChildForm(props: IChildForm) {
  const { localState } = props;
  const formMethods = useForm();
  const navigation = useNavigation();

  const {
    dispatch,
    state: {
      plantfamily: { plantfamilyid },
    },
  } = useProudPlantParent();

  const [addPlantChild, { loading, error: mutationError }] =
    useMutation(ADD_PLANT_CHILD);

  const isMutationError = Boolean(mutationError);
  const isMutationLoading = Boolean(loading);

  const onSubmit = (form: IForm) => {
    console.log("What is the plant family id:", plantfamilyid);

    const handleMutation = async (form: IForm) => {
      const { data } = await addPlantChild({
        variables: {
          commonnames: localState.plant_info.commonnames,
          plantfamilyid: plantfamilyid,
          plantgenus: localState.plant_info.plantgenus,
          plantname: localState.plant_info.plantname,
          plantnickname: form.plantnickname,
          plantspecies: localState.plant_info.plantspecies,
          scientificname: localState.plant_info.scientificname,
        },
      });

      const stateObj = data.insert_plantchild.returning[0];
      console.log("State Obj from response return:", stateObj);

      const payload = { ...stateObj };
      console.log("New payload obj:", payload);

      dispatch({ type: ActionType.ADD_PLANT_CHILD, payload: payload });

      !isMutationLoading && !isMutationError
        ? navigation.goBack()
        : console.error(mutationError);
    };

    handleMutation(form);
  };

  const onErrors = (errors: {}) => {
    console.warn(errors);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <FormProvider {...formMethods}>
        <FormInput
          name="plantnickname"
          label="Plant Nick Name"
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

      {isMutationError && <Text>{mutationError?.message}</Text>}
    </View>
  );
}

const ADD_PLANT_CHILD = gql`
  mutation (
    $commonnames: String
    $plantfamilyid: Int!
    $plantgenus: String
    $plantname: String!
    $plantnickname: String
    $plantspecies: String
    $scientificname: String
  ) {
    insert_plantchild(
      objects: {
        commonnames: $commonnames
        plantfamilyid: $plantfamilyid
        plantgenus: $plantgenus
        plantname: $plantname
        plantnickname: $plantnickname
        plantspecies: $plantspecies
        scientificname: $scientificname
      }
    ) {
      returning {
        age
        commonnames
        dateofbirth
        joinedfamilyat
        plantchildid
        plantdetails
        plantfamilyid
        plantgenus
        plantname
        plantnickname
        plantspecies
        scientificname
      }
    }
  }
`;
