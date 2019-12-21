import React from "react";

interface InitialState {
  email: string;
}

const initialState: InitialState = {
  email: ""
};

interface Action {
  payload: {
    email: string;
  };
  type: string;
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
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
  dispatch: () => {}
});

const useUser = () => {
  const contextValue = React.useContext(UserContext);
  return contextValue;
};

const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext, useUser };
