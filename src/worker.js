const StrategyOpenApi3 = (endpoints) => {
  const resolve_ref_recursive = (ref) => {
    // Some like components.schema.SchemaOfModel; to Array
    const array_of_keys = ref.substring(2).split("/");
    let obj = Object.assign(endpoints, {}); // endpoints solamente
    // Accessing to nested keys
    for (let i = 0; i < array_of_keys.length; i++) {
      obj = obj[array_of_keys[i]];
    }

    if ("properties" in obj) {
      const array_of_attributes = Object.entries(obj.properties);
      for (let i = 0; i < array_of_attributes.length; i++) {
        let element = array_of_attributes[i][1];
        // Recursive resolve nested references only if the $ref key is there
        if ("$ref" in element) {
          // Reassign!
          obj.properties[array_of_attributes[i][0]] = resolve_ref_recursive(
            element.$ref
          );
        } else if (
          // No todos los schema tienen $ref directamente,
          // a veces lo tienen adentro de items
          // "schema": {
          //   "title": "Response Read Contacts Auth V0 0 Contacts  Get",
          //   "type": "array",
          //   "items": { "$ref": "#/components/schemas/ContactRead" }
          // }
          "type" in element &&
          element.type === "array" &&
          "items" in element &&
          "$ref" in element.items
        ) {
          obj.properties[array_of_attributes[i][0]].items = [
            resolve_ref_recursive(element.items.$ref),
          ];
        }
      }
    } else if (
      // No todos los schema tienen $ref directamente,
      // a veces lo tienen adentro de items
      // "schema": {
      //   "title": "Response Read Contacts Auth V0 0 Contacts  Get",
      //   "type": "array",
      //   "items": { "$ref": "#/components/schemas/ContactRead" }
      // }
      "type" in obj &&
      obj.type === "array" &&
      "items" in obj &&
      "$ref" in obj.items
    ) {
      obj.items = [resolve_ref_recursive(obj.items.$ref)];
    }
    return obj;
  };

  const resolveRequestBodyOpenApi3 = (method_data) => {
    if ("$ref" in method_data) {
      method_data = resolve_ref_recursive(method_data.$ref);
    }
    const content_entries = Object.entries(method_data.content);
    if ("$ref" in content_entries[0][1].schema) {
      return {
        content_type: content_entries[0][0],
        body: resolve_ref_recursive(content_entries[0][1].schema.$ref),
      };
    } else if ("items" in content_entries[0][1].schema) {
      return {
        content_type: content_entries[0][0],
        body: [resolve_ref_recursive(content_entries[0][1].schema.items.$ref)],
      };
    } else {
      return {
        content_type: content_entries[0][0],
        body: content_entries[0][1].schema,
      };
    }
  };

  const resolveResponsesBodyOpenApi3 = (responses_data) => {
    const response_entries = Object.entries(responses_data);
    return response_entries.map((n) => {
      const optional_content = {};
      if ("content" in n[1]) {
        const content_entries = Object.entries(n[1].content);
        optional_content.content_type = content_entries[0][0];
        if ("$ref" in content_entries[0][1].schema) {
          optional_content.body = resolve_ref_recursive(
            content_entries[0][1].schema.$ref
          );
        } else if ("items" in content_entries[0][1].schema) {
          optional_content.body = [
            resolve_ref_recursive(content_entries[0][1].schema.items.$ref),
          ];
        }
      }
      return {
        http_status: n[0],
        description: n[1].description,
        ...optional_content,
      };
    });
  };

  const tags = {};
  const entries_path = Object.entries(endpoints.paths);

  for (let i = 0; i < entries_path.length; i++) {
    const [url, methods] = entries_path[i];
    const method_entries = Object.entries(methods);
    for (let j = 0; j < method_entries.length; j++) {
      const [method, details] = method_entries[j];
      if ("tags" in details) {
        for (let n = 0; n < details.tags.length; n++) {
          const tag = details.tags[n];
          if (!(tag in tags)) {
            tags[tag] = {
              title: tag,
              description: "",
              ID_SECTION: `${j + 1}_${url}`,
              methods: [],
            };
          }
          tags[tag].methods.push({
            title: details.summary,
            description: details.description,
            method: method,
            url: url,
            response:
              "responses" in details
                ? resolveResponsesBodyOpenApi3(details.responses)
                : [],
            request:
              "requestBody" in details
                ? resolveRequestBodyOpenApi3(details.requestBody)
                : {},
            ID_SECTION: details.operationId,
          });
        }
      } else {
        const tag = url.substring(1).split("/")[0];
        if (!(tag in tags)) {
          tags[tag] = {
            title: tag,
            description: "",
            ID_SECTION: `${j + 1}_${url}`,
            methods: [],
          };
        }
        tags[tag].methods.push({
          title: details.summary,
          description: details.description,
          method: method,
          url: url,
          response:
            "responses" in details
              ? resolveResponsesBodyOpenApi3(details.responses)
              : [],
          request:
            "requestBody" in details
              ? resolveRequestBodyOpenApi3(details.requestBody)
              : {},
          ID_SECTION: details.operationId,
        });
      }
    }
  }

  return Object.values(tags);
};

const StrategyDefault = (endpoints) => {
  const output = [];
  for (let i = 0; i < endpoints.length; i++) {
    const element = endpoints[i];
    element["ID_SECTION"] = `${i + 1}_${element.endpoint}`;
    for (let j = 0; j < element.methods.length; j++) {
      const sub_element = element.methods[j];
      sub_element["ID_SECTION"] = `${i + 1}_${j + 1}_${element.endpoint}`;
    }
    output.push(element);
  }

  return output;
};

export const generateEndpoints = (data) => {
  if (!("openapi" in data)) {
    data = StrategyDefault(data);
  } else if ("openapi" in data && /^3.0.[0-3]$/.test(data.openapi)) {
    data = StrategyOpenApi3(data);
  } else {
    console.error("Specification not yet supported");
  }
  postMessage({ endpoint_message: true, endpoints: data });
};
