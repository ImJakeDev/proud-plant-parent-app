import { IPlantParent } from "../init-state/Index";

export enum ActionType {
  ADD_PLANT_PARENT,
  EDIT_PLANT_PARENT,
  DELETE_PLANT_PARENT,

  ADD_PLANT_FAMILY,
  EDIT_PLANT_FAMILY,
  DELETE_PLANT_FAMILY,

  ADD_PLANT_PROFILE,
  EDIT_PLANT_PROFILE,
  DELETE_PLANT_PROFILE,
}

export interface IAddPlantPatent {
  type: ActionType.ADD_PLANT_PARENT;
  payload: IPlantParent;
}

export interface IEditPlantPatent {
  type: ActionType.EDIT_PLANT_PARENT;
  payload: IPlantParent;
}

export interface IDeletePlantPatent {
  type: ActionType.DELETE_PLANT_PARENT;
  payload: {plantparentid: number};
}

export type Actions = IAddPlantPatent | IEditPlantPatent | IDeletePlantPatent;