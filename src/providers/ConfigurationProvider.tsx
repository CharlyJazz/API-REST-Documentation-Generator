import React, { useEffect } from "react";
import { Action, Config } from "../types";

interface InitialState extends Config {}

const initialState: InitialState = {
  loginStrategy: () => null,
  logoutStrategy: () => null,
  getUserStrategy: () => null,
  with_login: true,
  url_base: "",
  endpoint_url: "",
  footer: {
    enable: true,
    text: "",
  },
  header: {
    enable: true,
    logo_url: "",
  },
  first_content: {
    title: "",
    description: "",
  },
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "INITIAL_SETUP":
      return action.payload;
    default:
      return state;
  }
};

const ConfigurationContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

const useConfiguration = () => {
  const contextValue = React.useContext(ConfigurationContext);
  return contextValue;
};

interface Props {
  children: React.ReactNode;
  config: any;
}

const ConfigurationProvider: React.FC<Props> = ({ children, config }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  useEffect(() => {
    dispatch({ type: "INITIAL_SETUP", payload: config });
  }, [config]);
  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export { ConfigurationProvider, ConfigurationContext, useConfiguration };
