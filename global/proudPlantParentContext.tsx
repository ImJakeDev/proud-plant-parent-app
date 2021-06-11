import React, { createContext, useReducer, useContext, Dispatch } from "react";

import { initialState, InitState } from "./state-management/init-state/Index";
import { Actions } from "./state-management/actions/Index";
import { proudPlantParentReducer } from "./state-management/reducers/Index";

/*
  Todo: separate concerns!
  * Initial State:
    - What is it? How do I want it to look?
    - Array or object???
  * Actions:
    - What are my actions and what do they do?
    - Create, Read, Update, Delete
  * Reducers:
    - How do I handle my reducers?
    - Do I have categories of Reducers???
  * Context:
    - Where and how do I handle this? 
    - I like wrapping things in convenience hooks
*/

const ProudPlantParentContext = createContext<{
  state: InitState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const ProudPlantParentProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(proudPlantParentReducer, initialState);
  console.log("Proud Plant Parent Provider State:", state);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <ProudPlantParentContext.Provider value={value}>
      {children}
    </ProudPlantParentContext.Provider>
  );
};

export function useProudPlantParent() {
  const context = useContext(ProudPlantParentContext);
  if (context === undefined) {
    throw new Error(
      "useProudPlantParent must be used within a ProudPlantParentProvider"
    );
  }
  return context;
}
