import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/proudPlantParentContext";
import Button from "../components/Button";

export default function PlantChildren() {
  const navigation = useNavigation();
  const {
    state: {
      plantfamily: { familyname },
      plantpchildren,
    },
  } = useProudPlantParent();

  // const isPlantProfile = Boolean(plantpchildren);
  // console.log(isPlantProfile);

  return (
    <View>
      <Text>Family name: {familyname}</Text>
      {plantpchildren?.length > 0 ? (
        <Text>{JSON.stringify(plantpchildren)}</Text>
      ) : (
        <Button
          title="Add a plant to the fam. +🪴"
          onPress={() => navigation.navigate("AddPlantChildScreen")}
        />
      )}
    </View>
  );
}
