import React, { useContext, useState, useEffect } from "react";
import { ConfigurationContext } from "../../providers/ConfigurationProvider";
import { UserContext } from "../../providers/UserProvider";
import DocumentationApp from "../../compositions/DocumentationApp";
import Login from "../../ui/Login";

// @ts-ignore
import worker from "workerize-loader!../../worker"; // eslint-disable-line import/no-webpack-loader-syntax

interface Props {
  endpoints: {}[] | {};
}
/*
 * If there are a user, a worker will set the unique id of each section
 * Meanwhile the DocumentationApp appear empty.
 * This is useful for +1000 items in array, to avoid
 * White screen waiting por seconds
 */
const App: React.FC<Props> = ({ endpoints }) => {
  const workerInstance = worker();
  const [data, setData] = useState([]);
  const {
    state: { with_login },
  } = useContext(ConfigurationContext);
  const {
    state: { email },
  } = useContext(UserContext);
  useEffect(() => {
    if (!with_login || (with_login && email)) {
      workerInstance.addEventListener("message", (message) => {
        if (message.data.endpoint_message) {
          if (process.env.NODE_ENV === "development") {
            console.log("New Message: ", message.data);
          }
          setData(message.data.endpoints);
        }
      });
      workerInstance.generateEndpoints(endpoints);
    }
  }, [with_login, email, endpoints, workerInstance]);

  if (with_login && !email) {
    return <Login />;
  }

  return <DocumentationApp data={data} />;
};

export default App;
