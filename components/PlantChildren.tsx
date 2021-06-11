import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/proudPlantParentContext";
import Button from "../components/Button";

export default function PlantChildren() {
  const navigation = useNavigation();
  const {
    state: {
      plantfamily: { familyname, plantprofile },
    },
  } = useProudPlantParent();

  const isPlantProfile = Boolean(plantprofile);
  console.log(isPlantProfile);

  return (
    <View>
      <Text>Family name: {familyname}</Text>
      {isPlantProfile ? (
        <Text>There sure is!</Text>
      ) : (
        <Button
          title="Add a plant to the fam. +🪴"
          onPress={() => navigation.navigate("")}
        />
      )}
    </View>
  );
}
