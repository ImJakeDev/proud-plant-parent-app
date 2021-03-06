import { InitState } from "../init-state/Index";
import { ActionType, Actions } from "../actions/Index";

export function proudPlantParentReducer(state: InitState, action: Actions) {
  switch (action.type) {
    case ActionType.ADD_PLANT_PARENT:
      return { ...state, plantparent: { ...action.payload } };
    case ActionType.ADD_PLANT_FAMILY:
      return { ...state, plantfamily: { ...action.payload } };
    case ActionType.ADD_PLANT_CHILD:
      return {
        ...state,
        plantchildren: [...state.plantchildren, { ...action.payload }],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
