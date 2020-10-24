import React from "react";
// import CodeExample from "../CodeExample";
import Text, {
  DESCRIPTION_METHOD_SECTION,
  TITLE_METHOD_SECTION,
} from "../Text";
import ResponseSchema from "../ResponseSchema/ResponseSchema";
import Spacing from "../Spacing";

interface Props {
  response?: {
    http_status?: string;
    description?: string;
    content_type?: string;
    body?: object;
  }[];
}

const Response: React.FC<Props> = ({ response }) => {
  return response && response.length ? (
    <>
      <Spacing />
      <Text type={TITLE_METHOD_SECTION}>
        {`Response${response.length > 1 ? "s" : ""}`}:
      </Text>
      <Spacing />
      {response.map((n) => {
        return (
          <div key={n.description}>
            <Text type={DESCRIPTION_METHOD_SECTION}>
              {n.description || "Without description"}:
            </Text>
            <Spacing px={10} />
            {n.http_status && (
              <>
                <Text type={DESCRIPTION_METHOD_SECTION}>
                  Status: {n.http_status}
                </Text>
                <Spacing px={10} />
              </>
            )}
            {n.content_type && (
              <>
                <Text type={DESCRIPTION_METHOD_SECTION}>
                  Content Type: {n.content_type}
                  <Spacing px={10} />
                </Text>
              </>
            )}
            {/* <CodeExample code={JSON.stringify(n.body, null, 2)} /> */}
            {<ResponseSchema data={n.body} />}
            <Spacing />
          </div>
        );
      })}
    </>
  ) : null;
};

export default Response;
