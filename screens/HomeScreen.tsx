import * as React from "react";
import { StyleSheet, Alert } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { ActionType } from "../global/state-management/actions/Index";
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
        plantfamily,
      },
    },
    dispatch,
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
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            })
          )
        }
      />
      <View style={{ paddingBottom: 20 }}>
        <Text>My full name is: {firstname + " " + lastname}</Text>
        <Text>Call me: {nickname}</Text>
        <Text>Became a parent at: {timeofparenthood}</Text>
        <Text>{JSON.stringify(plantfamily, null, 3)}</Text>
      </View>
      <Button
        title="What is my ID?"
        onPress={() => Alert.alert(`Your ID: ${plantparentid}`)}
      />
      {plantfamily === null ? (
        <Button
          title="Start a plant family!"
          onPress={() =>
            dispatch({
              type: ActionType.ADD_PLANT_FAMILY,
              payload: {
                plantfamilyid: null,
                familyname: "",
                becamefamily: "",
                plantparentid: null,
                plantprofile: null,
              },
            })
          }
        />
      ) : (
        <Text>You have a family</Text>
      )}
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
