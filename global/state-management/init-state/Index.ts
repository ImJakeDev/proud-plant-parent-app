export interface InitState {
  plantparent: IPlantParent;
  plantfamily?: IPlantFamily | null;
}

export interface IPlantParent {
  __typename: string;
  firstname: string;
  lastname: string;
  nickname?: string;
  plantparentid: number | null;
  timeofparenthood: string;
}

export interface IPlantFamily {
  __typename: string;
  plantfamilyid: number | null;
  familyname: string;
  becamefamily: string;
  plantparentid: number | null;
  plantprofile?: IPlantProfile[] | null;
}

export interface IPlantProfile {
  __typename: string;
  plantprofileid: number | null;
  plantname: string;
  plantdetails?: string;
  scientificname: string;
  plantgenus: string;
  plantspecies: string;
  dateofbirth: string;
  joinedfamilyat: string;
  age: string;
  plantfamilyid: number | null;
}

export const initialState: InitState = {
  plantparent: {
    __typename: "",
    firstname: "",
    lastname: "",
    nickname: "",
    plantparentid: null,
    timeofparenthood: "",
  },
  plantfamily: {
      __typename: "",
      plantfamilyid: null,
      familyname: "",
      becamefamily: "",
      plantparentid: null,
      plantprofile: [
        {
          __typename: "",
          plantprofileid: null,
          plantname: "",
          plantdetails: "",
          scientificname: "",
          plantgenus: "",
          plantspecies: "",
          dateofbirth: "",
          joinedfamilyat: "",
          age: "",
          plantfamilyid: null,
        },
      ],
    },
};
