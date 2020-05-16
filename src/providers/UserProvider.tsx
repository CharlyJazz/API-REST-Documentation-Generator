import React, { useEffect } from "react";
import { Action } from "../types";

interface InitialState {
  email: string;
}

const initialState: InitialState = {
  email: ""
};



const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        email: action.payload.email
      };
    }
    case "GET_LOGGED_USER": {
      return {
        ...state,
        email: action.payload.email
      };
    }
    default:
      return state
  }
};

const UserContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => { }
});

const useUser = () => {
  const contextValue = React.useContext(UserContext);
  return contextValue;
};

interface Props { children: React.ReactNode; config: any }

const UserProvider: React.FC<Props> = ({ children, config }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  useEffect(() => {
    const user = config.getUserStrategy()
    if (user && 'email' in user)
      dispatch({ type: 'GET_LOGGED_USER', payload: user })
  }, [config])
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext, useUser };
