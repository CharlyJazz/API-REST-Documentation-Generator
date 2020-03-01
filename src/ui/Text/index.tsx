import React from "react";
import "./styles.scss";

interface Props {
  children: React.ReactNode | string;
  type: string;
  onClick?(): any;
  style?: {};
  render_breaklines?: boolean;
}

export const TITLE_ENDPOINT = "TITLE_ENDPOINT";
export const DESCRIPTION_ENDPOINT = "DESCRIPTION_ENDPOINT";
export const TITLE_METHOD_SECTION = "TITLE_METHOD_SECTION";
export const DESCRIPTION_METHOD_SECTION = "DESCRIPTION_METHOD_SECTION";

// Text component to use in all text use cases
// Sometime we want render <br/> because the text have \n (OA3)
const Text: React.FC<Props> = props => {
  const { type, onClick, style, render_breaklines } = props;

  let { children } = { ...props };

  if (render_breaklines && children && typeof children === "string") {
    children = children.split(`\n`).map((txt, i) => (
      <Text type={type} key={i}>
        {txt}
        <br />
      </Text>
    ));
  }

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
