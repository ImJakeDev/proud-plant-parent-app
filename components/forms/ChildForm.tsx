import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, View, Text, Image, Platform } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

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

  const [image, setImage] = React.useState(null);

  const [addPlantChild, { loading, error }] = useMutation(ADD_PLANT_CHILD);
  const isMutationError = Boolean(error);
  const isMutationLoading = Boolean(loading);

  const {
    dispatch,
    state: {
      plantfamily: { plantfamilyid },
    },
  } = useProudPlantParent();

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSubmit = (form: IForm) => {
    console.log("What is the plant family id:", plantfamilyid);

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
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
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
        plantchildid
        plantspecies
        scientificname
      }
    }
  }
`;
