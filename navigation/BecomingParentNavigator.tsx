import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from '../screens/WelcomeScreen'
import PlantParentScreen from '../screens/PlantParentScreen'

const Stack = createStackNavigator()

export default function BecomingParentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: "Welcome!" }}
      />
      <Stack.Screen
        name="PlantParentScreen"
        component={PlantParentScreen}
        options={{ headerTitle: "Plant Parent" }}
      />
    </Stack.Navigator>
  )
}