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
      {plantchildren?.length >= 1 ? (
        <View>
          <Button
            title="Add a plant to the fam. +🪴"
            onPress={() => navigation.navigate("AddPlantChildScreen")}
          />
          <FlatList
            data={plantchildren}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Text>{JSON.stringify(item, null, 4)}</Text>
            )}
          />
        </View>
      ) : (
        <Button
          title="Add a plant to the fam. +🪴"
          onPress={() => navigation.navigate("AddPlantChildScreen")}
        />
      )}
    </View>
  );
}
