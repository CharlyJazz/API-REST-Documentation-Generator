import endpoints from "./data/endpoints.json";

export type SchemaType = {
  field: string;
  rules: {}
}

export interface MethodProps {
  description?: string;
  method: string;
  response?: {};
  title: string;
  url: string;
  note?: string,
  ID_SECTION: string;
}

export interface Endpoint {
  title?: string;
  description?: string;
  ID_SECTION: string;
  methods?: MethodProps[]
  fields?: SchemaType[];
}

const generateData = (endpoints: {
  title: string;
  endpoint: string;
  methods: {
    title: string
  }[];
}[]) => {
  const temp = [...endpoints]
  for (let i = 0; i < temp.length; i++) {
    const element = temp[i];
    element['ID_SECTION'] = `${i + 1}_${element.endpoint}`
    for (let j = 0; j < element.methods.length; j++) {
      const sub_element = element.methods[j];
      sub_element['ID_SECTION'] = `${i + 1}_${j + 1}_${element.endpoint}`
    }
  }
  return temp
};

const data: Endpoint[] = generateData(endpoints);

export default data;
