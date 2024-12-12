import { UploadOutlined } from "@mui/icons-material";
import { Button, Upload } from "antd";
import React from "react";
const props = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};
const UploadImage = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
    </Upload>
  );
};

export default UploadImage;
