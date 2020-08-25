import React, { useContext } from "react";
import { ConfigurationContext } from "../../providers/ConfigurationProvider";
import "./styles.scss";
import Spacing from "../Spacing";

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
const RequestURL: React.FC<Props> = (props) => {
  const { method, url } = props;
  const {
    state: { url_base },
  } = useContext(ConfigurationContext);
  return (
    <>
      <Spacing />
      <div className="RequestURL">
        <div className={`RequestURL__method method`}>
          <p style={{ color: methodColor(method.toLowerCase()) }}>{method}</p>
        </div>
        <div className="RequestURL__url">
          <p>{`${url_base}${url}`}</p>
        </div>
      </div>
    </>
  );
};

export default RequestURL;
