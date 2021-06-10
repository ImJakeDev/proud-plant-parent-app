import React, { createContext, useReducer, useContext, Dispatch } from "react";

import { IParentObj } from '../components/forms/ParentForm'

interface IStateTypes {
  plantparent: {
    firstname: string;
    lastname: string;
    nickname?: string;
    plantparentid: number;
    timeofparenthood: string;
  };
}

interface IActionTypes {
  type: string;
  payload: IParentObj;
}

const initialState: IStateTypes = {
  plantparent: {
    firstname: "",
    lastname: "",
    nickname: "",
    plantparentid: 0.0,
    timeofparenthood: "",
  },
};

const ProudPlantParentContext = createContext<{
  state: IStateTypes;
  dispatch: Dispatch<IActionTypes>;
}>({
  state: initialState,
  dispatch: () => null,
});

function proudPlantParentReducer(state: IStateTypes, action: IActionTypes) {
  switch (action.type) {
    case "ADD_PLANT_PARENT":
      return action.payload;
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const ProudPlantParentProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(proudPlantParentReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ProudPlantParentContext.Provider value={value}>
      {children}
    </ProudPlantParentContext.Provider>
  );
};

function useProudPlantParent() {
  const context = useContext(ProudPlantParentContext);
  if (context === undefined) {
    throw new Error(
      "useProudPlantParent must be used within a ProudPlantParentProvider"
    );
  }
  return context;
}

export { ProudPlantParentProvider, useProudPlantParent };
