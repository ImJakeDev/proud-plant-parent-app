export interface InitState {
  plantparent: IPlantParent;
}

export interface IPlantParent {
  firstname: string;
  lastname: string;
  nickname?: string;
  plantparentid: number | null | undefined;
  timeofparenthood: string;
  plantfamily?: IPlantFamily | null;
}

export interface IPlantFamily {
  plantfamilyid: number | null;
  familyname: string;
  becamefamily: string;
  plantparentid: number | null;
  plantprofile?: IPlantProfile[] | null;
}

export interface IPlantProfile {
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
    firstname: "",
    lastname: "",
    nickname: "",
    plantparentid: null,
    timeofparenthood: "",
    plantfamily: {
      plantfamilyid: null,
      familyname: "",
      becamefamily: "",
      plantparentid: null,
      plantprofile: [
        {
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
  },
};
