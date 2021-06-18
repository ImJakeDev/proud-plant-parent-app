import * as React from "react";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";

import usePlantId from "../hooks/usePlantId";
import IPlantIdRes from "../Types/IPlantIdRes";

import { ILocalState } from "./AddPlantChild";

interface IPlantId {
  localState: ILocalState;
  setLocalState: (arg0: ILocalState) => void;
}

export default function PlantId(props: IPlantId) {
  const {
    localState: {
      picked_image: { base64: imageBase64 },
      camera_photo: { base64: photoBase64 },
      plant_info,
    },
    localState,
    setLocalState,
  } = props;

  const { data, isLoading, isError, isSuccess, error } = usePlantId(
    imageBase64 || photoBase64
  );

  useEffect(() => {
    const handleDataToState = (data: IPlantIdRes | undefined) => {
      if (!data) return plant_info;

      const newPlantInfoState: ILocalState = {
        ...localState,
        plant_info: {
          commonnames: data.suggestions[0].plant_details.common_names[0] || "",
          isUpdated: true,
          plantdetails: "",
          plantgenus: data.suggestions[0].plant_details.structured_name.genus,
          plantname: data.suggestions[0].plant_name,
          plantnickname: "",
          plantspecies:
            data.suggestions[0].plant_details.structured_name.species,
          scientificname: data.suggestions[0].plant_details.scientific_name,
        },
      };

      setLocalState(newPlantInfoState);
    };

    !isLoading && handleDataToState(data);
  }, [isLoading]);

  return (
    <View>
      {isLoading && (
        <View>
          <Text>🤖 AI Is Loading Data of Plant Info...</Text>
          <ActivityIndicator size="large" color="#55a630" />
        </View>
      )}
      {isSuccess && <Text>✅</Text>}
      {isError && <Text>{error?.message}</Text>}
    </View>
  );
}
