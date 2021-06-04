import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function BecomeAPlantParentScreen(params:{}) {
  return (
    <View/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});