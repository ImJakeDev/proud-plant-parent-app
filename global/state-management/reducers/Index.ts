import { InitState, IPlantParent, IPlantFamily, IPlantProfile, initialState } from '../init-state/Index'
import { ActionType, IAddPlantPatent, IEditPlantPatent, IDeletePlantPatent, Actions } from '../actions/Index'

export function proudPlantParentReducer(state: InitState, action: Actions) {
  switch (action.type) {
    case ActionType.ADD_PLANT_PARENT:
      return { ...state, ...action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}