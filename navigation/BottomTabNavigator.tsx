/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import PlantParentScreen from "../screens/PlantParentScreen";
import StartPlantFamilyScreen from "../screens/StartPlantFamilyScreen";
import AddPlantChildScreen from "../screens/AddPlantChildScreen";

type BottomTabParamList = {
  Home: undefined;
  PlantParent: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="PlantParent"
        component={PlantParentNavigator}
        options={{
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

type TabOneParamList = {
  HomeScreen: undefined;
  StartPlantFamilyScreen: undefined;
  AddPlantChildScreen: undefined;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Proud Plant Parent" }}
      />
      <HomeStack.Screen
        name="StartPlantFamilyScreen"
        component={StartPlantFamilyScreen}
        options={{ headerTitle: "Stating a Plant Family" }}
      />
      <HomeStack.Screen
        name="AddPlantChildScreen"
        component={AddPlantChildScreen}
        options={{ headerTitle: "Add a Plant" }}
      />
    </HomeStack.Navigator>
  );
}

type TabTwoParamList = {
  PlantParentScreen: undefined;
};

const PlantParentStack = createStackNavigator<TabTwoParamList>();

function PlantParentNavigator() {
  return (
    <PlantParentStack.Navigator>
      <PlantParentStack.Screen
        name="PlantParentScreen"
        component={PlantParentScreen}
        options={{ headerTitle: "Plant Parent" }}
      />
    </PlantParentStack.Navigator>
  );
}
