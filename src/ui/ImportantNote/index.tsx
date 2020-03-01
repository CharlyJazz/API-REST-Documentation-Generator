import React from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../Text";
import "./styles.scss";

interface Props {
  note?: string;
}

const ImportantNote: React.FC<Props> = ({ note }) => {
  return note ? (
    <div className="ImportantNote">
      <Text type={DESCRIPTION_METHOD_SECTION}>{note}</Text>
    </div>
  ) : null;
};

export default ImportantNote;
