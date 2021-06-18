import * as React from "react";
import { StyleSheet, View } from "react-native";

import AddPlantChild from "../components/AddPlantChild";

export default function AddPlantChildScreen() {
  return (
    <View style={styles.container}>
      <AddPlantChild />
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
