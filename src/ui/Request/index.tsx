import React from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../Text";
import CodeExample from "../CodeExample";
import ResponseSchema from "../ResponseSchema/ResponseSchema";

interface Props {
  request?: any;
}

const Request: React.FC<Props> = ({ request }) => {
  return request && "content_type" in request ? (
    <>
      <Text type={DESCRIPTION_METHOD_SECTION}>Request</Text>
      {/* <CodeExample code={JSON.stringify(request, null, 2)} /> */}
      {request.body && <ResponseSchema data={request.body} />}
    </>
  ) : null;
};

export default Request;
