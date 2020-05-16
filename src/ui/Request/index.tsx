import React from "react";
import Text, { TITLE_METHOD_SECTION } from "../Text";
// import CodeExample from "../CodeExample";
import ResponseSchema from "../ResponseSchema/ResponseSchema";
import Spacing from "../Spacing";

interface Props {
  request?: any;
}

const Request: React.FC<Props> = ({ request }) => {
  console.log(request)
  return request && "content_type" in request ? (
    <>
      <Spacing />
      <Text type={TITLE_METHOD_SECTION}>Request:</Text>
      <Spacing />
      {/* <CodeExample code={JSON.stringify(request, null, 2)} /> */}
      {request.body && <ResponseSchema data={request.body} />}
    </>
  ) : null;
};

export default Request;
