import * as React from "react";
import { StyleSheet } from "react-native";
import moment from 'moment'

import { Text, View } from "../components/Themed";
import { useProudPlantParent } from "../global/state-management/context/index";

export default function PlantParentScreen() {
  const {
    state: {
      plantparent: { firstname, lastname, nickname, timeofparenthood },
    },
  } = useProudPlantParent();
  const isNickName = Boolean(nickname);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstname} {lastname} Proud Plant Parent</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {isNickName && <Text>A.K.A: {nickname}</Text>}
      <Text>Became a parent on {moment(timeofparenthood).format('MMMM Do YYYY, h:mm:ss a')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
