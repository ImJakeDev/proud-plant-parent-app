import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, View, Text, Image, ScrollView } from "react-native";

import usePlantId from "../hooks/usePlantId";
import IPlantIdRes from "../Types/IPlantIdRes";

import { ILocalState } from "./forms/ChildForm";

interface IPlantId {
  localState: ILocalState;
  setLocalState: (arg0: ILocalState) => void;
}

export default function PlantId(props: IPlantId) {
  
  const base64Image =
    props.localState.picked_image.base64.length > 0
      ? props.localState.picked_image.base64
      : null;

  const { data, isLoading, isError, error, status } = usePlantId(base64Image);

  useEffect(() => {
    const handleDataToState = (data: IPlantIdRes | undefined) => {
      if (!data) return props.localState.plant_info;

      const newPlantInfoState: ILocalState = {
        ...props.localState,
        plant_info: {
          plantname: data.suggestions[0].plant_name,
          plantnickname: "",
          plantdetails: "",
          scientificname: data.suggestions[0].plant_details.scientific_name,
          plantgenus: data.suggestions[0].plant_details.structured_name.genus,
          plantspecies:
            data.suggestions[0].plant_details.structured_name.species,
          isUpdated: true,
        },
      };

      props.setLocalState(newPlantInfoState);
    };
    !isLoading && handleDataToState(data);
  }, [isLoading]);

  return (
    <View>
      {props.localState.picked_image.uri ? (
        <Image
          source={{ uri: props.localState.picked_image.uri }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <ActivityIndicator size="large" color="#55a630" />
      )}
      {isLoading ? (
        <View>
          <Text>🤖 AI Is Loading Data of Plant Info...</Text>
          <ActivityIndicator size="large" color="#55a630" />
        </View>
      ) : (
        <Text>{status}</Text>
      )}
      {isError && <Text>{error?.message}</Text>}
    </View>
  );
}
