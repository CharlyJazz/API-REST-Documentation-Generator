import React from "react";
import {
  loginStrategy,
  logoutStrategy,
  getUserStrategy,
  withLogin
} from "../config";

interface InitialState {
  loginStrategy: (email: string, password: string) => any;
  logoutStrategy: () => void;
  getUserStrategy: () => any;
  withLogin: boolean;
  urlBase: string;
}

interface Action {
  type: string;
}

const initialState: InitialState = {
  loginStrategy,
  logoutStrategy,
  getUserStrategy,
  withLogin,
  urlBase: ""
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ConfigurationContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {}
});

const useConfiguration = () => {
  const contextValue = React.useContext(ConfigurationContext);
  return contextValue;
};

const ConfigurationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export { ConfigurationProvider, ConfigurationContext, useConfiguration };
