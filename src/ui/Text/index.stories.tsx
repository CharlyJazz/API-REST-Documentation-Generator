import React from "react";
import Text, {
  TITLE_ENDPOINT,
  DESCRIPTION_ENDPOINT,
  TITLE_METHOD_SECTION,
  DESCRIPTION_METHOD_SECTION
} from ".";

export default {
  title: "Text",
  component: Text
};

export const aTitleForAllTheSection: React.FC = () => (
  <Text type={TITLE_ENDPOINT}>Food Resource</Text>
);
export const aTitleForHTTPMethod: React.FC = () => (
  <Text type={TITLE_METHOD_SECTION}>Get all foods</Text>
);
export const aDescriptionForAllTheSection: React.FC = () => (
  <Text type={DESCRIPTION_ENDPOINT}>Endpoint for foods of good peoples</Text>
);
export const aDescriptionForHTTPMethod: React.FC = () => (
  <Text type={DESCRIPTION_METHOD_SECTION}>
    You can filter it using query params to get foods
  </Text>
);
