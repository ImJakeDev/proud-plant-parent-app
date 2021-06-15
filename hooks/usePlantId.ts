import { useQuery } from "react-query";
import { PLANT_ID_API_KEY } from "@env";
import IPlantIdRes from "../Types/IPlantIdRes";

const getPlantIdData = async (image: string | null) => {
  console.log("What is the base64 image?", image);

  if (image && image.length > 0) {
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
  } else {
    throw new Error("Base64 image error.");
  }
};

export default function usePlantId(image: string | null) {
  return useQuery<IPlantIdRes, Error>(["plantId-data", image], () =>
    getPlantIdData(image)
  );
}
