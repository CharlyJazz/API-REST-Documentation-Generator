import React from "react";
import { Action } from "../types";

interface InitialState {
  text: string;
  section_id_active: string;
  sub_section_id_active: string;
}

const initialState: InitialState = {
  text: "",
  section_id_active: "",
  sub_section_id_active: "",
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_ID_SECTION":
      return {
        ...state,
        section_id_active: action.payload.value,
        sub_section_id_active: "",
      };
    case "SET_ID_SUB_SECTION":
      return {
        ...state,
        sub_section_id_active: action.payload.value,
      };
    case "SEARCH_TEXT":
      return {
        ...state,
        text: action.payload.value,
      };
    default:
      return state;
  }
};

const SearchContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

const useSearch = () => {
  const contextValue = React.useContext(SearchContext);
  return contextValue;
};

const SearchProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext, useSearch };
