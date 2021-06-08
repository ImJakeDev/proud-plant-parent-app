import * as React from "react";
import { StyleSheet, View } from "react-native";

import ParentForm from "../components/forms/ParentForm";

export default function BecomeAPlantParentScreen() {
  return (
    <View style={styles.container}>
      <ParentForm />
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
