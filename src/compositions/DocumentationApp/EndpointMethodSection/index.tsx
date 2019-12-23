import React, { useContext } from "react";
import RequestURL from "../../../ui/RequestURL";
import { MethodProps } from "../../../generateData";
import Text, {
  TITLE_METHOD_SECTION,
  DESCRIPTION_METHOD_SECTION
} from "../../../ui/Text";
import CodeExample from "../../../ui/CodeExample";
import ImportantNote from "../../../ui/ImportantNote";
import { SearchContext } from "../../../providers/SearchProvider";
import "./styles.scss";

/* This is the implementation of small ui components
   Check if the endpoint can render:

   1. CodeExample
   2. Response Example
   3. Request Body Example
   4. Note text
   5. Query Params in Table
*/
const EndpointMethodSection: React.FC<MethodProps> = props => {
  const { description, method, response, title, url, note, ID_SECTION } = props;
  const {
    state: { sub_section_id_active }
  } = useContext(SearchContext);
  return (
    <div className="EndpointMethodSection" id={ID_SECTION}>
      <Text type={TITLE_METHOD_SECTION}>
        <span
          style={{
            color:
              ID_SECTION === sub_section_id_active
                ? "rgb(0, 188, 212)"
                : "inherit"
          }}
        >
          {title}
        </span>
      </Text>
      <div style={{ height: 40 }} />
      <Text type={DESCRIPTION_METHOD_SECTION}>{description}</Text>
      <div style={{ height: 40 }} />
      <RequestURL {...{ method, url }} />
      <div style={{ height: 40 }} />
      {response ? (
        <>
          <Text type={DESCRIPTION_METHOD_SECTION}>
            This endpoint will <strong>response</strong> like:
          </Text>
          <div style={{ height: 40 }} />
          <CodeExample code={JSON.stringify(response, null, 2)} />
        </>
      ) : (
        <Text type={DESCRIPTION_METHOD_SECTION}>
          We dont have response example
        </Text>
      )}
      <div style={{ height: 40 }} />
      {note && <ImportantNote {...{ note }} />}
    </div>
  );
};

export default EndpointMethodSection;
