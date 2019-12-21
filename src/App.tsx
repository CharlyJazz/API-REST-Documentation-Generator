import React, { useContext } from "react";
import { ConfigurationContext } from "./providers/ConfigurationProvider";
import Login from "./ui/Login";
import { UserContext } from "./providers/UserProvider";
import DocumentationApp from "./compositions/DocumentationApp";
import data from "./generateData";

const App: React.FC = () => {
  const {
    state: { withLogin }
  } = useContext(ConfigurationContext);
  const {
    state: { email }
  } = useContext(UserContext);

  if (withLogin && !email) {
    return <Login />;
  }

  return <DocumentationApp data={data} />;
};

export default App;
