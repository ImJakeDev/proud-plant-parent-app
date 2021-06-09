import * as React from "react";

const ProudPlantParentContext = React.createContext(null);
const initialState = {}

function proudPlantParentReducer(state, action) {
  switch (action.type) {
    case "ADD_PLANT_PARENT":
      return [...state, action.payload];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ProudPlantParentProvider({ children }) {
  const [state, dispatch] = React.useReducer(proudPlantParentReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <ProudPlantParentContext.Provider value={value}>{children}</ProudPlantParentContext.Provider>;
}

function useProudPlantParent() {
  const context = React.useContext(ProudPlantParentContext);
  if (context === undefined) {
    throw new Error("useProudPlantParent must be used within a ProudPlantParentProvider");
  }
  return context;
}

export { ProudPlantParentProvider, useProudPlantParent };
