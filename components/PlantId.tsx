import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, View, Text, Image, ScrollView } from "react-native";

import usePlantId from "../hooks/usePlantId";
import IPlantIdRes from "../Types/IPlantIdRes";

interface IPlantId {
  image: string | null;
  base64: string;
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

  const handleDataToState = (data: IPlantIdRes | undefined) => {
    if (!data) return plantIdChild;

    const newPlantIdChildState: IPlantIdChild = {
      plantname: data.suggestions[0].plant_name || "",
      plantnickname: "",
      plantdetails: "",
      scientificname: data.suggestions[0].plant_details.scientific_name,
      plantgenus: data.suggestions[0].plant_details.structured_name.genus,
      plantspecies: data.suggestions[0].plant_details.structured_name.species,
    };
    setPlantIdChild(newPlantIdChildState);
  };

  !isLoading && handleDataToState(data);

  return (
    <View>
      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="Green" />
      ) : (
        <View>
          <Text>{status}</Text>
          <Text>{JSON.stringify(plantIdChild)}</Text>
        </View>
      )}
      {isError && <Text>{error?.message}</Text>}
    </View>
  );
}
