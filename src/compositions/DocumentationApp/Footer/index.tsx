import React from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../../../ui/Text";
import "./styles.scss";

// This component will be use the footer text
// from the configuration provider
const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <Text type={DESCRIPTION_METHOD_SECTION}>
        Copyright Ⓒ Baller Profile Inc. All Rights Reserved.
      </Text>
    </footer>
  );
};


export default Footer
