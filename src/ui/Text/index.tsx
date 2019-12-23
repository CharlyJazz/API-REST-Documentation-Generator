import React from "react";
import "./styles.scss";

interface Props {
  children: React.ReactNode;
  type: string;
  onClick?(): any;
  style?: {};
}

export const TITLE_ENDPOINT = "TITLE_ENDPOINT";
export const DESCRIPTION_ENDPOINT = "DESCRIPTION_ENDPOINT";
export const TITLE_METHOD_SECTION = "TITLE_METHOD_SECTION";
export const DESCRIPTION_METHOD_SECTION = "DESCRIPTION_METHOD_SECTION";

// Text component to use in all text use cases
const Text: React.FC<Props> = props => {
  const { children, type, onClick, style } = props;

  let extraProps: {
    style?: {};
    onClick?(): any;
    onKeyPress?(): any;
    tabIndex?: number;
  } = {};

  if (style) {
    extraProps["style"] = style;
  }

  if (onClick) {
    extraProps["onClick"] = onClick;
    extraProps["onKeyPress"] = onClick;
    extraProps["tabIndex"] = 1;
  }

  if (type === TITLE_ENDPOINT) {
    return (
      <h1 {...extraProps} className="Text_Title-Endpoint">
        {children}
      </h1>
    );
  } else if (type === DESCRIPTION_ENDPOINT) {
    return (
      <p {...extraProps} className="Text__Description-Endpooint">
        {children}
      </p>
    );
  } else if (type === TITLE_METHOD_SECTION) {
    return (
      <h2 {...extraProps} className="Text__Title-Method">
        {children}
      </h2>
    );
  } else if (type === DESCRIPTION_METHOD_SECTION) {
    return (
      <p {...extraProps} className="Text__Description-Method">
        {children}
      </p>
    );
  } else {
    return (
      <p {...extraProps} className="Text__Description-Method">
        {children}
      </p>
    );
  }
};

export default Text;
