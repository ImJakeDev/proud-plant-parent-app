import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import { Text, View } from "../components/Themed";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title />
      <View
        style={styles.separator}
        lightColor="#e1e1e1"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Become a Proud Plant Parent! 😁"
        onPress={() => navigation.navigate("BecomeAPlantParentScreen")}
      />
    </View>
  );
}

function Title() {
  return (
    <View>
      <Text style={styles.title}>Welcome soon to be</Text>
      <Text style={styles.title}>Proud Plant Parent</Text>
      <Text style={styles.title}>🪴</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
