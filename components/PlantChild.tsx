import * as React from "react";
import { View, Text } from "react-native";

import { IPlantChild } from "../global/state-management/init-state/Index";

interface IPlantChildProps {
  plantChild: IPlantChild;
}

export default function PlantChild(props: IPlantChildProps) {
  const {
    plantChild: { plantname, plantgenus, plantnickname, plantspecies },
  } = props;
  const isPlantNickName = Boolean(plantnickname);
  const isPlantGenus = Boolean(plantgenus);
  const isPlantSpecies = Boolean(plantspecies);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text>Plant Name: {plantname}</Text>
      {isPlantNickName && <Text>Plant Nick Name: {plantnickname}</Text>}
      {isPlantSpecies && <Text>Plant Species: {plantspecies}</Text>}
      {isPlantGenus && <Text>Plant Genus: {plantgenus}</Text>}
    </View>
  );
}
