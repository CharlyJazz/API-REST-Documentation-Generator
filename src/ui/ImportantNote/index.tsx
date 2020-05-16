import React from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../Text";
import "./styles.scss";
import Spacing from "../Spacing";

interface Props {
  note?: string;
}

const ImportantNote: React.FC<Props> = ({ note }) => {
  return note ? (
    <>
      <Spacing />
      <div className="ImportantNote">
        <Text type={DESCRIPTION_METHOD_SECTION}>{note}</Text>
      </div>
    </>
  ) : null;
};

export default ImportantNote;
