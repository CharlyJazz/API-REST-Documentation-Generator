import React from "react";
import "./styles.scss";

const ToggleSchema = ({ schema }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="ToggleSchema">
      <div onClick={() => setShow(!show)}>
        <span className="ToggleSchema__title">{schema.title}</span>
        <span className="ToggleSchema__brace">{!show ? "{...}" : ""}</span>
      </div>
      {show && (
        <div style={{ marginTop: "6px" }}>
          <ResponseSchema onlyProps data={schema} />
        </div>
      )}
    </div>
  );
};

interface PropertyProps {
  name: string;
  property: any;
  isRequired: boolean;
}

const Property: React.FC<PropertyProps> = ({ name, property, isRequired }) => {
  return (
    <li className="Property">
      <div className="Property__key">
        {name}
        {isRequired && <span className="Property__required">*</span>}
      </div>
      <div className="Property__values">
        {property.properties ? (
          <ToggleSchema schema={property} />
        ) : (
          <div>
            <div className="Property__type">{property.type}</div>
            {property.description ? (
              <div className="Property__description">
                {property.description}
              </div>
            ) : null}
            {property.example ? (
              <div className="Property__example">
                Example: {property.example}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </li>
  );
};

interface SchemaProps {
  data: any;
  onlyProps?: boolean;
}

const ResponseSchema: React.FC<SchemaProps> = ({ data, onlyProps }) => {
  if (!data) {
    return (
      <div className="Schema">
        <span className="Schema__name">No response example</span>
      </div>
    );
  } else if (Array.isArray(data)) {
    return (
      <div className="Schema">
        <span className="Schema__brace">{"[{"}</span>
        <ul>
          {Object.keys(data[0].properties).map((key) => {
            const property = data[0].properties[key];

            return (
              <Property
                key={key}
                name={key}
                property={property}
                isRequired={
                  data[0].required
                    ? data[0].required.indexOf(key) !== -1
                    : false
                }
              />
            );
          })}
        </ul>
        <span className="Schema__brace">{"}...]"}</span>
      </div>
    );
  } else {
    return (
      <div className="Schema">
        <span className="Schema__brace">{"{"}</span>
        <ul>
          {data.properties
            ? Object.keys(data.properties).map((key) => {
                const property = data.properties[key];

                return (
                  <Property
                    key={key}
                    name={key}
                    property={property}
                    isRequired={
                      data.required ? data.required.indexOf(key) !== -1 : false
                    }
                  />
                );
              })
            : data.items
            ? Object.keys(data.items[0].properties).map((key) => {
                const property = data.items[0].properties[key];

                return (
                  <Property
                    key={key}
                    name={key}
                    property={property}
                    isRequired={
                      data.items[0].required
                        ? data.items[0].required.indexOf(key) !== -1
                        : false
                    }
                  />
                );
              })
            : Object.keys(data).map((key) => {
                const property = data[key];

                return (
                  <Property
                    key={key}
                    name={key}
                    property={property}
                    isRequired={data.required ? data.indexOf(key) !== 1 : false}
                  />
                );
              })}
        </ul>
        <span className="Schema__brace">{"}"}</span>
      </div>
    );
  }
};

export default ResponseSchema;
