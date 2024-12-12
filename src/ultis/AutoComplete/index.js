import { AutoComplete } from "antd";
import React, { useState } from "react";

const countries = [
  "Âu Mỹ",
  "Thái Lan",
  "Nga",
  "Việt Nam",
  "Tây Ban Nha",
  "Indonesia",
  "Malaysia",
  "Brazil",
  "Thụy Điển",
  "Ireland",
  "Ukraina",
  "UAE",
  "Colombia",
  "Nigeria",
  "Tất cả quốc gia",
  "Trung Quốc",
  "Anh",
  "Đài Loan",
  "Ấn Độ",
  "Úc",
  "Canada",
  "Philippines",
  "Mexico",
  "Na Uy",
  "Ba Lan",
  "Bỉ",
  "Phần Lan",
  "Ả Rập Xê Út",
  "Chile",
  "Argentina",
  "Thổ Nhĩ Kỳ",
  "Hàn Quốc",
  "Nhật Bản",
  "Hồng Kông",
  "Ý",
  "Pháp",
  "Đức",
  "Nam Phi",
  "Hà Lan",
  "Đan Mạch",
  "Thụy Sĩ",
  "Bồ Đào Nha",
  "Hy Lạp",
  "Singapore",
];

const AutoCompleteCountries = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    const filteredOptions = countries
      .filter((country) => country.toLowerCase().includes(value.toLowerCase()))
      .map((country) => ({ value: country }));
    setOptions(filteredOptions);
  };

  return (
    <AutoComplete
      style={{ width: "100%" }}
      options={options}
      onSearch={handleSearch}
      placeholder="Nhập tên quốc gia"
      allowClear
    />
  );
};

export default AutoCompleteCountries;
