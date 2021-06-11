import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useProudPlantParent } from "../global/proudPlantParentContext";
import Button from "../components/Button";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    state: {
      plantparent: {
        firstname,
        lastname,
        nickname,
        timeofparenthood,
        plantparentid,
      },
    },
  } = useProudPlantParent();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Home is where the plants are.</Text>
      </View>
      <View
        style={styles.separator}
        lightColor="#e1e1e1"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Go to welcome screen."
        onPress={() => navigation.navigate("Welcome", { screen: "Welcome" })}
      />
      <Text>{firstname + " " + lastname}</Text>
      <Text>Became a parent at: {timeofparenthood}</Text>
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
