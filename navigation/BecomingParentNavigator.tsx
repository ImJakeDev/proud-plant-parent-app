import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import BecomeAPlantParentScreen from "../screens/BecomeAPlantParentScreen";

const Stack = createStackNavigator();

export default function BecomingParentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome!" }}
      />
      <Stack.Screen
        name="BecomeAPlantParentScreen"
        component={BecomeAPlantParentScreen}
        options={{ headerTitle: "The Path to Plant Parenthood" }}
      />
    </Stack.Navigator>
  );
}
