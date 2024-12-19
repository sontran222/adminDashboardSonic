import { AutoComplete } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

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

const AutoCompleteCountries = ({ name, countryName, OnChangeCountry }) => {
  const [options, setOptions] = useState([]);
  const [countryValue, setCountryValue] = useState(countryName);

  useEffect(() => {
    // Đồng bộ giá trị countryValue khi countryName thay đổi
    setCountryValue(countryName);
  }, [countryName]);

  const handleSearch = debounce((value) => {
    //Sử dụng debounce để giảm số lần tìm kiếm
    const filteredOptions = countries
      .filter((country) => country.toLowerCase().includes(value.toLowerCase()))
      .map((country) => ({ value: country }));
    setOptions(filteredOptions);
  }, 300);

  const handleChange = (value) => {
    if (OnChangeCountry) {
      OnChangeCountry(name, value);
    }
  };

  return (
    <AutoComplete
      style={{ width: "100%" }}
      value={countryValue}
      options={options}
      onSearch={handleSearch} //Search giá trị lấy mảng có thể xảy ra
      onChange={handleChange} // Chọn value
      placeholder="Nhập tên quốc gia"
      allowClear
    />
  );
};

AutoCompleteCountries.propTypes = {
  name: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  OnChangeCountry: PropTypes.func,
};

export default AutoCompleteCountries;
