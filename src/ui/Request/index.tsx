import React from "react";
import Text, { DESCRIPTION_METHOD_SECTION } from "../Text";
import CodeExample from "../CodeExample";

interface Props {
  request?: {};
}

const Request: React.FC<Props> = ({ request }) => {
  return request && "content_type" in request ? (
    <>
      <Text type={DESCRIPTION_METHOD_SECTION}>Request</Text>
      <CodeExample code={JSON.stringify(request, null, 2)} />
    </>
  ) : null;
};

export default Request;
