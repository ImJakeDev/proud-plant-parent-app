import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, View, Text, Image, ScrollView } from "react-native";

import usePlantId from "../hooks/usePlantId";

interface IPlantId {
  image: string | null;
  base64: string | null;
}

interface IPlantIdChild {
  plantname: string;
  plantnickname?: string;
  plantdetails?: string;
  scientificname?: string;
  plantgenus?: string;
  plantspecies?: string;
}

const initialState = {
  plantname: "",
  plantnickname: "",
  plantdetails: "",
  scientificname: "",
  plantgenus: "",
  plantspecies: "",
};

export default function PlantId(props:IPlantId) {
  const [plantIdChild, setPlantIdChild] = React.useState<IPlantIdChild>(initialState)

  const { data, isFetching, isError, error } = usePlantId(props.base64);
  isFetching ? console.log("going to fecth soon or is fetching still...") : console.log("What is data???", data);

  return (
    <ScrollView>
      {props.image ? <Image source={{ uri: props.image }} style={{ width: 200, height: 200 }} />:<ActivityIndicator size="large" color="Green" />}
      {/* {props.base64 ? <Text>{JSON.stringify(data, null, 4)}</Text>:<ActivityIndicator size="large" color="Green" />} */}
      {isError && <Text>{error?.message}</Text>}
    </ScrollView>
  )
}