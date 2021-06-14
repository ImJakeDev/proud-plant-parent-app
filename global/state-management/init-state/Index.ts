export interface InitState {
  plantparent: IPlantParent;
  plantfamily: IPlantFamily;
  plantpchildren: IPlantChild[];
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
}

export interface IPlantChild {
  __typename: string;
  plantpchildid: number | null;
  plantname: string;
  plantdetails?: string;
  scientificname?: string;
  plantgenus?: string;
  plantspecies?: string;
  dateofbirth?: string;
  joinedfamilyat: string;
  age?: string;
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
  },
  plantpchildren: [],
};
