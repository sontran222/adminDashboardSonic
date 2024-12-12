import { Select } from "antd";
import React from "react";

const index = ({ options, onChange, defaultValue }) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{
        width: "100%",
      }}
      onChange={onChange}
      options={options}
    />
  );
};

export default index;
