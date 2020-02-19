export type SchemaType = {
  field: string;
  rules: {};
};

export interface MethodProps {
  description?: string;
  method: string;
  response?: {};
  title: string;
  url: string;
  note?: string;
  ID_SECTION: string;
}

export interface Endpoint {
  title?: string;
  description?: string;
  ID_SECTION: string;
  methods?: MethodProps[];
  fields?: SchemaType[];
}

const generateData = (endpoints: any): Endpoint[] => {
  for (let i = 0; i < endpoints.length; i++) {
    const element = endpoints[i];
    element["ID_SECTION"] = `${i + 1}_${element.endpoint}`;
    for (let j = 0; j < element.methods.length; j++) {
      const sub_element = element.methods[j];
      sub_element["ID_SECTION"] = `${i + 1}_${j + 1}_${element.endpoint}`;
    }
  }
  return endpoints;
};

export default generateData;
