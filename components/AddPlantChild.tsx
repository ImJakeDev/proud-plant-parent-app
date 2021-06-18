import * as React from "react";
import { useState } from "react";
import { View, Platform, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ChildForm from "./forms/ChildForm";
import Button from "./Button";
import Camera from "./Camera";
import PlantId from "./PlantId";

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
  commonnames: string;
  isUpdated: boolean;
  plantdetails?: string;
  plantgenus?: string;
  plantname: string;
  plantnickname?: string;
  plantspecies?: string;
  scientificname?: string;
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
    commonnames: "",
    isUpdated: false,
    plantdetails: "",
    plantgenus: "",
    plantname: "",
    plantnickname: "",
    plantspecies: "",
    scientificname: "",
  },
};

export default function AddPlantChild() {
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [localState, setLocalState] = useState<ILocalState>(local_state);

  const isCameraURI = Boolean(localState.camera_photo.uri);
  const isCameraBase64 = Boolean(localState.camera_photo.base64);

  const isImageURI = Boolean(localState.picked_image.uri);
  const isImageBase64 = Boolean(localState.picked_image.base64);

  const isPlantInfoUpdated = Boolean(localState.plant_info.isUpdated);

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

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {isCameraReady ? (
        <Camera
          localState={localState}
          setIsCameraReady={setIsCameraReady}
          setLocalState={setLocalState}
        />
      ) : (
        <View style={{ paddingLeft: 10, paddingRight: 10, alignContent: "center" }}>
          <View style={{paddingHorizontal: 40, paddingTop: 20, alignSelf: "center"}}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />

            <Button
              title="Take a picture of a plant"
              onPress={() => setIsCameraReady(true)}
            />
          </View>

          <View style={{paddingHorizontal: 40, paddingBottom: 20, alignSelf: "center"}}>
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
          </View>
          
          <View style={{paddingHorizontal: 40, paddingBottom: 20, alignSelf: "center"}}>
            {isImageBase64 && (
              <PlantId localState={localState} setLocalState={setLocalState} />
            )}

            {isCameraBase64 && (
              <PlantId localState={localState} setLocalState={setLocalState} />
            )}
          </View>
          
          <View style={{paddingHorizontal: 40, paddingBottom: 20, alignSelf: "center"}}>
            {isPlantInfoUpdated && <ChildForm localState={localState} />}
          </View>
        </View>
      )}
    </View>
  );
}
