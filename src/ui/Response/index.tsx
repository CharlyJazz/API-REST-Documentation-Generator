import React from "react";
import CodeExample from "../CodeExample";
import Text, { DESCRIPTION_METHOD_SECTION } from "../Text";

interface Props {
  response?: {
    http_status?: string;
    description?: string;
    content_type?: string;
    body?: string;
  }[];
}

const Response: React.FC<Props> = ({ response }) => {
  return response && response.length ? (
    <>
      <Text type={DESCRIPTION_METHOD_SECTION}>Responses</Text>
      {response.map(n => {
        return (
          <div key={n.description}>
            <Text type={DESCRIPTION_METHOD_SECTION}>{n.description}:</Text>
            <Text type={DESCRIPTION_METHOD_SECTION}>
              Status: {n.http_status}
            </Text>
            <Text type={DESCRIPTION_METHOD_SECTION}>
              Content Type: {n.content_type}
            </Text>
            <CodeExample code={JSON.stringify(n.body, null, 2)} />
          </div>
        );
      })}
    </>
  ) : null;
};

export default Response;
