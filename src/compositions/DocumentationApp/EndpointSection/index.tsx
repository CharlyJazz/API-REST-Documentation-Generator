import React, { RefObject } from "react";
import Text, {
  TITLE_ENDPOINT,
  DESCRIPTION_ENDPOINT,
  TITLE_METHOD_SECTION,
} from "../../../ui/Text";
import Table from "../../../ui/Table";
import EndpointMethodSection from "../EndpointMethodSection";
import { MethodProps, SchemaType } from "../../../types";
import Spacing from "../../../ui/Spacing";
import "./styles.scss";

const Schema: React.FC<{ schema: SchemaType[] }> = ({ schema }) => {
  const keys: string[] = Object.keys(schema[0].rules);
  const header_cols: string[] = ["name", ...keys];
  const rows: any[][] = [];
  for (let i = 0; i < schema.length; i++) {
    const element = schema[i];
    const values = Object.values(element.rules);
    rows.push([element.field, ...values]);
  }
  return <Table {...{ header_cols, rows }} />;
};

interface Props {
  title?: string;
  description?: string;
  schema?: SchemaType[];
  methods?: MethodProps[];
  ID_SECTION: string;
}

// This is the implementation will render a
// EndpointMethodSection for each HTTP method of a endpoint
const EndpointSection = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { title, description, schema, methods, ID_SECTION } = props;
    return (
      <section className="EndpointSection" ref={ref}>
        <div id={`${ID_SECTION}`}>
          <Text type={TITLE_ENDPOINT}>
            <span style={{ textTransform: "capitalize" }}>{title}</span>
          </Text>
          <Spacing />
          <Text type={DESCRIPTION_ENDPOINT}>{description}</Text>
        </div>
        <Spacing />
        {schema && schema.length ? (
          <>
            <Text type={TITLE_METHOD_SECTION}>Schema</Text>
            <Spacing />
            <Schema {...{ schema }} />
            <Spacing />
          </>
        ) : null}
        {methods
          ? methods.map((method: MethodProps) => (
              <div key={method.ID_SECTION}>
                <EndpointMethodSection {...method} />
              </div>
            ))
          : null}
      </section>
    );
  }
);

export default EndpointSection;
