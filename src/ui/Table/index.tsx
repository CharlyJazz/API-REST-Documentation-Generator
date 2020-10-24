import React from "react";
import "./styles.scss";

interface Props {
  header_cols: string[];
  rows: any[][];
}

// Table component to use when the documentation
// Need render attribute-description data
const Table: React.FC<Props> = (props) => {
  const { header_cols, rows } = props;
  return (
    <table className="Table">
      <thead>
        <tr>
          {header_cols.map((col, key) => {
            return <th key={key}>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((cols, i) => {
          return (
            <tr key={i}>
              {cols.map((col, j) => {
                return <td key={j}>{col}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
