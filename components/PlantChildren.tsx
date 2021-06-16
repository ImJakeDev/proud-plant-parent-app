import * as React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/proudPlantParentContext";
import Button from "../components/Button";

export default function PlantChildren() {
  const navigation = useNavigation();
  const {
    state: {
      plantfamily: { familyname },
      plantchildren,
    },
  } = useProudPlantParent();

  return (
    <View>
      <Text>Family name: {familyname}</Text>
      <Button
        title="Add a plant to the fam. +🪴"
        onPress={() => navigation.navigate("AddPlantChildScreen")}
      />
      {plantchildren?.length >= 1 && (
        <FlatList
          data={plantchildren}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => (
            <Text>{JSON.stringify(item, null, 4)}</Text>
          )}
        />
      )}
    </View>
  );
}
