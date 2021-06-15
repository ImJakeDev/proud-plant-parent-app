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

export default function PlantId(props: IPlantId) {
  const [plantIdChild, setPlantIdChild] = useState<IPlantIdChild>(initialState);

  const { data, isLoading, isError, error, status } = usePlantId(props.base64);

  return (
    <View>
      {props.image ? (
        <Image
          source={{ uri: props.image }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <ActivityIndicator size="large" color="Green" />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="Green" />
      ) : (
        <Text>{status}</Text>
      )}
      {isError && <Text>{error?.message}</Text>}
    </View>
  );
}
