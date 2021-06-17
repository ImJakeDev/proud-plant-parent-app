import React, { useState, useEffect, ReactNode } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

import Button from "./Button";
import { ILocalState } from "./forms/ChildForm";

interface ICameraFeature {
  setIsCameraReady: (arg0: boolean) => void;
  setLocalState: (arg0: ILocalState) => void;
  localState: ILocalState;
}

export default function CameraFeature(props: ICameraFeature) {
  const [camera, setCamera] = useState<any | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync({
      base64: true,
      quality: 1,
    });

    console.log("Photo response", JSON.stringify(photo, null, 4));

    const newCameraPhoto = {
      ...props.localState,
      camera_photo: {
        base64: photo.base64,
        uri: photo.uri,
      },
    };
    props.setLocalState(newCameraPhoto);
    props.setIsCameraReady(false);
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignContent: "flex-start",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
