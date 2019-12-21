import React from "react";
import "./styles.scss";

const Loading: React.FC = () => (
  <div className='Loading'>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading
