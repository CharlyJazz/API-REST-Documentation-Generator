import React from "react";

const Spacing: React.FC<{ px: number }> = ({ px }) => (
  <div style={{ height: px }} />
);

Spacing.defaultProps = {
  px: 40
};

export default Spacing;
