export default interface IPlantIdRes {
  id: number;
  custom_id: string;
  meta_data: {
    latitude: string;
    longitude: string;
    date: string;
  };
  uploaded_datetime: number;
  finished_datetime: number;
  images: IImages[];
  suggestions: ISuggestions[];
  modifiers: string[];
  secret: string;
  fail_cause: string;
  countable: boolean;
  feedback: string;
  is_plant: boolean;
  is_plant_probability: number;
}

interface IImages {
  file_name: string;
  url: string;
}

interface ISuggestions {
  id: number;
  plant_name: string;
  plant_details: {
    scientific_name: string;
    structured_name: {
      genus: string;
      species: string;
    };
    common_names: string[];
    url: string;
    name_authority: string;
    wiki_description: {
      value: string;
      citation: string;
      license_name: string;
      license_url: string;
    };
    taxonomy: {
      kingdom: string;
      phylum: string;
      class: string;
      order: string;
      family: string;
      genus: string;
    };
    synonyms: string[];
    gbif_id: string;
    edible_parts: string[];
    propagation_methods: string[];
  };
  probability: number;
  confirmed: boolean;
  similar_images: ISimilarImages[];
}

interface ISimilarImages {
  id: string;
  similarity: number;
  url: string;
  url_small: string;
  citation?: string;
  license_name?: string;
  license_url?: string;
}
