import React from "react";
import Text, {
  TITLE_ENDPOINT,
  DESCRIPTION_ENDPOINT,
  TITLE_METHOD_SECTION
} from "../../../ui/Text";
import Table from "../../../ui/Table";
import EndpointMethodSection from "../EndpointMethodSection";
import { MethodProps, SchemaType } from "../../../generateData";
import "./styles.scss";

interface Props {
  title?: string;
  description?: string;
  schema?: SchemaType[];
  methods?: MethodProps[];
  ID_SECTION: string
}

const Schema: React.FC<{ schema: SchemaType[] }> = ({ schema }) => {
  const keys = Object.keys(schema[0].rules) || [];
  const header_cols: string[] = ["name", ...keys];
  const rows: any[][] = [];
  for (let i = 0; i < schema.length; i++) {
    const element = schema[i];
    const values = Object.values(element.rules);
    rows.push([element.field, ...values]);
  }
  return <Table {...{ header_cols, rows }} />;
};

// This is the implementation will render a
// EndpointMethodSection for each HTTP method of a endpoint
const EndpointSection: React.FC<Props> = props => {
  const { title, description, schema, methods, ID_SECTION } = props;
  return (
    <section className="EndpointSection">
      <div id={`${ID_SECTION}`}>
        <Text type={TITLE_ENDPOINT}>
          <span style={{ textTransform: "capitalize" }}>{title}</span>
        </Text>
        <div style={{ height: 20 }} />
        <Text type={DESCRIPTION_ENDPOINT}>{description}</Text>
      </div>
      <div style={{ height: 80 }} />

      {schema && schema.length ? (
        <>
          <Text type={TITLE_METHOD_SECTION}>Schema</Text>
          <div style={{ height: 40 }} />
          <Schema {...{ schema }} />
          <div style={{ height: 80 }} />
        </>
      ) : null}

      {methods
        ? methods.map((method: MethodProps) => (
            <div key={method.ID_SECTION}>
              <EndpointMethodSection {...method} />
              <div style={{ height: 80 }} />
            </div>
          ))
        : null}
    </section>
  );
};

export default EndpointSection;
