const StrategyOpenApi3 = endpoints => {
  const resolve_ref_recursive = ref => {
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
            resolve_ref_recursive(element.items.$ref)
          ];
        }
      }
    }
    return obj;
  };

  const resolveRequestBodyOpenApi3 = method_data => {
    const content_entries = Object.entries(method_data.content);
    return {
      content_type: content_entries[0][0],
      body: resolve_ref_recursive(content_entries[0][1].schema.$ref)
    };
  };

  const resolveResponsesBodyOpenApi3 = responses_data => {
    const response_entries = Object.entries(responses_data);
    return response_entries.map(n => {
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
            resolve_ref_recursive(content_entries[0][1].schema.items.$ref)
          ];
        }
      }
      return {
        http_status: n[0],
        description: n[1].description,
        ...optional_content
      };
    });
  };

  const output = [];
  const entries_path = Object.entries(endpoints.paths);

  for (let i = 0; i < entries_path.length; i++) {
    const [url, methods] = entries_path[i];
    const item = {};
    item["ID_SECTION"] = `${i + 1}_${url}`;
    item.title = url;
    item.description = "";
    item.fields = [];
    item.methods = Object.entries(methods).map(m => ({
      title: m[1].summary,
      description: m[1].description,
      method: m[0],
      url: url,
      response:
        "responses" in m[1] ? resolveResponsesBodyOpenApi3(m[1].responses) : [],
      request:
        "requestBody" in m[1]
          ? resolveRequestBodyOpenApi3(m[1].requestBody)
          : {},
      ID_SECTION: m[1].operationId
    }));
    output.push(item);
  }

  return output;
};
const StrategyDefault = endpoints => {
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

export const generateEndpoints = (data, specification) => {
  if (specification === "default") {
    data = StrategyDefault(data);
  } else if (specification === "oa3") {
    data = StrategyOpenApi3(data);
  }
  postMessage({ endpoint_message: true, endpoints: data });
};
