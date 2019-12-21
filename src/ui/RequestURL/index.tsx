import React, { useContext } from "react";
import { ConfigurationContext } from "../../providers/ConfigurationProvider";
import "./styles.scss";

interface Props {
  method: string;
  url: string;
}

const methodColor = (method: string) => {
  switch (method) {
    case "get":
      return "red";
    case "post":
      return "blue";
    case "put":
      return "green";
    case "patch":
      return "purple";
    case "delete":
      return "orange";
    default:
      return "red";
  }
};

// This componente receive the endpoint url, method
// User can copy the url
const RequestURL = (props: Props) => {
  const { method, url } = props;
  const {
    state: { urlBase }
  } = useContext(ConfigurationContext);
  return (
    <div className="RequestURL">
      <div className={`RequestURL__method method`}>
        <p style={{ color: methodColor(method.toLowerCase()) }}>{method}</p>
      </div>
      <div className="RequestURL__url">
        <p>{`${urlBase}${url}`}</p>
      </div>
    </div>
  );
};

export default RequestURL;
