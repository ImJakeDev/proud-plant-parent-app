import * as React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View, Text, Platform, Image } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { ActionType } from "../../global/state-management/actions/Index";
import { useProudPlantParent } from "../../global/state-management/context/index";
import { FormInput } from "../react-hook-forms/FormInput";
import Button from "../Button";
import PlantId from "../PlantId";
import Camera from "../Camera";

interface IForm {
  plantnickname?: string;
}

export interface ILocalState {
  picked_image: {
    base64: string;
    uri: string;
  };
  camera_photo: {
    base64: string;
    uri: string;
  };
  plant_info: IPlantIdChild;
}

export interface IPlantIdChild {
  plantname: string;
  plantnickname?: string;
  plantdetails?: string;
  scientificname?: string;
  plantgenus?: string;
  plantspecies?: string;
  isUpdated: boolean;
  commonnames: string;
}

const local_state = {
  picked_image: {
    base64: "",
    uri: "",
  },
  camera_photo: {
    base64: "",
    uri: "",
  },
  plant_info: {
    isUpdated: false,
    plantdetails: "",
    plantgenus: "",
    plantname: "",
    plantnickname: "",
    plantspecies: "",
    scientificname: "",
    commonnames: "",
  },
};

export default function ChildForm() {
  // ---------- Start of Variable declaration ----------
  const formMethods = useForm();
  const navigation = useNavigation();

  const [isCameraReady, setIsCameraReady] = useState(false);

  const [localState, setLocalState] = useState<ILocalState>(local_state);

  const isCameraURI = Boolean(localState.camera_photo.uri);
  const isCameraBase64 = Boolean(localState.camera_photo.base64);

  const isImageURI = Boolean(localState.picked_image.uri);
  const isImageBase64 = Boolean(localState.picked_image.base64);

  const [addPlantChild, { loading, error: mutationError }] =
    useMutation(ADD_PLANT_CHILD);

  const isMutationError = Boolean(mutationError);
  const isMutationLoading = Boolean(loading);

  const {
    dispatch,
    state: {
      plantfamily: { plantfamilyid },
    },
  } = useProudPlantParent();
  // ---------- End of Variable declaration ----------

  // ---------- Start of ImagePicker feature implementation ----------
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newPickedImage = {
        ...localState,
        picked_image: {
          base64: result.base64 || "",
          uri: result.uri,
        },
      };
      setLocalState(newPickedImage);
    }
  };
  // ---------- End of ImagePicker feature implementation ----------

  // ---------- Start of Form Actions ----------
  const onSubmit = (form: IForm) => {
    console.log("What is the plant family id:", plantfamilyid);

    const handleMutation = async (form: IForm) => {
      const { data } = await addPlantChild({
        variables: {
          plantnickname: form.plantnickname,
          plantname: localState.plant_info.plantname,
          plantgenus: localState.plant_info.plantgenus,
          scientificname: localState.plant_info.scientificname,
          plantspecies: localState.plant_info.plantspecies,
          plantfamilyid: plantfamilyid,
          commonnames: localState.plant_info.commonnames,
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
  // ---------- End of Form Actions ----------

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {isCameraReady ? (
        <Camera
          setIsCameraReady={setIsCameraReady}
          localState={localState}
          setLocalState={setLocalState}
        />
      ) : (
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />

          <Button
            title="Take a picture of a plant"
            onPress={() => setIsCameraReady(true)}
          />

          {isImageURI && (
            <Image
              source={{ uri: localState.picked_image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}

          {isCameraURI && (
            <Image
              source={{ uri: localState.camera_photo.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}

          {isImageBase64 && (
            <PlantId localState={localState} setLocalState={setLocalState} />
          )}

          {isCameraBase64 && (
            <PlantId localState={localState} setLocalState={setLocalState} />
          )}

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
      )}
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
