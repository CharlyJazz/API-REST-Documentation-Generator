import React, { useContext } from "react";
import RequestURL from "../../../ui/RequestURL";
import { MethodProps } from "../../../types";
import Text, {
  TITLE_METHOD_SECTION,
  DESCRIPTION_METHOD_SECTION
} from "../../../ui/Text";
import ImportantNote from "../../../ui/ImportantNote";
import { SearchContext } from "../../../providers/SearchProvider";
import Response from "../../../ui/Response";
import Request from "../../../ui/Request";
import Spacing from "../../../ui/Spacing";
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
  const {
    description,
    method,
    response,
    title,
    url,
    note,
    request,
    ID_SECTION
  } = props;
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
      <Spacing />
      <Text render_breaklines type={DESCRIPTION_METHOD_SECTION}>
        {description}
      </Text>
      <RequestURL {...{ method, url }} />
      <Request {...{ request }} />
      <Response {...{ response }} />
      <ImportantNote {...{ note }} />
    </div>
  );
};

export default EndpointMethodSection;
