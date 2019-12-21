import React from "react";
import "./styles.scss";

// CodeExample render a example of how look the response,
// request body, or other things.
// https://www.pluralsight.com/guides/typescript-building-react-components
const CodeExample: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="CodeExampleWrapper">
      <pre className="CodeExample">{code}</pre>
    </div>
  );
};

export default CodeExample;
