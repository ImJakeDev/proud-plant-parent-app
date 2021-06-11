import { IPlantParent, IPlantFamily } from "../init-state/Index";

export enum ActionType {
  ADD_PLANT_PARENT = "ADD_PLANT_PARENT",
  EDIT_PLANT_PARENT = "EDIT_PLANT_PARENT",
  DELETE_PLANT_PARENT = "DELETE_PLANT_PARENT",

  ADD_PLANT_FAMILY = "ADD_PLANT_FAMILY",
  // EDIT_PLANT_FAMILY,
  // DELETE_PLANT_FAMILY,

  // ADD_PLANT_PROFILE,
  // EDIT_PLANT_PROFILE,
  // DELETE_PLANT_PROFILE,
}

export interface IAddPlantParent {
  type: ActionType.ADD_PLANT_PARENT;
  payload: IPlantParent;
}

export interface IEditPlantParent {
  type: ActionType.EDIT_PLANT_PARENT;
  payload: IPlantParent;
}

export interface IAddPlantFamily {
  type: ActionType.ADD_PLANT_FAMILY;
  payload: IPlantFamily;
}

export type Actions = IAddPlantParent | IEditPlantParent | IAddPlantFamily;
