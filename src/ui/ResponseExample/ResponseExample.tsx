import React from 'react';
import "./styles.scss";

const ResponseExample:React.FC<{ data: any }> = ({ data }) => {
  const json = JSON.stringify(data, null, 2);

  return (
    <div className="ResponseExample">
      <pre>{json}</pre>
    </div>
  );
};

export default ResponseExample;
