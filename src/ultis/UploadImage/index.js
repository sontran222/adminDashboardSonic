import { UploadOutlined } from "@mui/icons-material";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const UploadImage = ({ name, onFileChange }) => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  };

  const onChange = (info) => {
    setFileList(info.fileList);
    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length - 1]?.originFileObj;
      onFileChange(name, file);
    } else {
      onFileChange(name, null);
    }
  };

  const onRemove = (file) => {
    setFileList((prevFileList) => {
      prevFileList.filter((f) => f.uid !== file.uid);
      return updatedList;
    });
    onFileChange(name, null);
  };
  return (
    <Upload beforeUpload={beforeUpload} fileList={fileList} onChange={onChange} onRemove={onRemove}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
    </Upload>
  );
};
UploadImage.propTypes = {
  name: PropTypes.string.isRequired,
  onFileChange: PropTypes.func,
};
export default UploadImage;
