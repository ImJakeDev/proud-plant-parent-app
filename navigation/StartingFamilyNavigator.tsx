import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StartPlantFamilyScreen from "../screens/StartPlantFamilyScreen";

const Stack = createStackNavigator();

export default function BecomingParentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartPlantFamilyScreen"
        component={StartPlantFamilyScreen}
        options={{ headerTitle: "The Path to Plant Parenthood" }}
      />
    </Stack.Navigator>
  );
}
