import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/state-management/context/index";
import Button from "../components/Button";
import PlantChildren from "../components/PlantChildren";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    state: {
      plantfamily: { plantfamilyid },
    },
  } = useProudPlantParent();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Home is where the plants are.</Text>
      </View>
      <View
        style={styles.separator}
        lightColor="#e1e1e1"
        darkColor="rgba(255,255,255,0.1)"
      />
      {plantfamilyid === null ? (
        <Button
          title="Start a plant family! 🌱"
          onPress={() => navigation.navigate("StartPlantFamilyScreen")}
        />
      ) : (
        <PlantChildren />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
  },
  separator: {
    marginVertical: 20,
    height: 2,
    width: "80%",
  },
});
