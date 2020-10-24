import React, { useContext } from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../../../ui/Text";
import { ConfigurationContext } from "../../../providers/ConfigurationProvider";
import "./styles.scss";

// This component will be use the footer text
// from the configuration provider
const Footer: React.FC = () => {
  const {
    state: {
      footer: { text, enable },
    },
  } = useContext(ConfigurationContext);
  return enable ? (
    <footer className="Footer">
      <Text type={DESCRIPTION_METHOD_SECTION}>{text}</Text>
    </footer>
  ) : null;
};

export default Footer;
