import * as React from "react";
import { StyleSheet, View } from "react-native";

import FamilyForm from "../components/forms/FamilyForm";

export default function StartPlantFamilyScreen() {
  return (
    <View style={styles.container}>
      <FamilyForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
