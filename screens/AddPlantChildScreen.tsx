import * as React from "react";
import { StyleSheet, View } from "react-native";

import ChildForm from "../components/forms/ChildForm";

export default function AddPlantChildScreen() {
  return (
    <View style={styles.container}>
      <ChildForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
