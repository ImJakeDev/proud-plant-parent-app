import * as React from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/state-management/context/index";
import Button from "../components/Button";
import PlantChild from "./PlantChild";

export default function PlantChildren() {
  const navigation = useNavigation();
  const {
    state: {
      plantfamily: { familyname },
      plantchildren,
    },
  } = useProudPlantParent();

  return (
    <SafeAreaView>
      <Text>Family name: {familyname}</Text>
      <Button
        title="Add a plant to the fam. +🪴"
        onPress={() => navigation.navigate("AddPlantChildScreen")}
      />
      {plantchildren?.length >= 1 && (
        <FlatList
          data={plantchildren}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item }) => <PlantChild plantChild={item} />}
        />
      )}
    </SafeAreaView>
  );
}
