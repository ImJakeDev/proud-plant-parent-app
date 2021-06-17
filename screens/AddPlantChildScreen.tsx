import * as React from "react";
import { StyleSheet, View } from "react-native";

import ChildForm from "../components/forms/ChildForm";

export default function AddPlantChildScreen() {
  return (
    <View style={styles.container}>
      {/* Buttons */}
      {/* Camera */}
      {/* Form */}
      <ChildForm />
      {/* Submit */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
