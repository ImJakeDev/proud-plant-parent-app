import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import usePlantId from "../hooks/usePlantId";

interface IPlantId {
  image: string | null;
  base64: string | null;
}
export default function PlantId(props:IPlantId) {

  const { data, isFetching, isError, error } = usePlantId(props.base64);
  isFetching ? console.log("going to fecth soon or is fetching still...") : console.log("What is data???", data);

  return (
    <ScrollView>
      {props.image && <Image source={{ uri: props.image }} style={{ width: 200, height: 200 }} />}
      {props.base64 && <Text>{JSON.stringify(data.suggestions[0], null, 4)}</Text>}
      {isError && <Text>{error.message}</Text>}
    </ScrollView>
  )
}