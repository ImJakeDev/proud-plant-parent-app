import { useQuery } from "react-query";
import { PLANT_ID_API_KEY } from "@env";

const getPlantIdData = async (image: string|null) => {
  if (image===null) return 

  const base64files = image; // Might be an array of strings...
  console.log("What is the base64 image?", image);

  const data = {
    api_key: PLANT_ID_API_KEY,
    images: [image],
    modifiers: ["crops_fast", "similar_images"],
    plant_language: "en",
    plant_details: [
      "common_names",
      "url",
      "name_authority",
      "wiki_description",
      "taxonomy",
      "synonyms",
    ],
  };

  const res = await fetch("https://api.plant.id/v2/identify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
  return res;
};

export default function usePlantId(image: string|null) {
  return useQuery<Error>(["plantId-data", image], () => getPlantIdData(image));
}
