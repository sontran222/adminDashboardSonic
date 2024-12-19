import { UploadOutlined } from "@mui/icons-material";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";

const UploadVideo = ({ onFileChange, time }) => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = (file) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error(`${file.name} is not a video file`);
    }
    return isVideo || Upload.LIST_IGNORE;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const onChange = (info) => {
    setFileList(info.fileList);

    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length - 1]?.originFileObj;
      if (file) {
        // const videoElement = document.createElement("video");
        // videoElement.src = URL.createObjectURL(file);

        // videoElement.onloadedmetadata = () => {
        //   const duration = formatDuration(videoElement.duration);
        //   console.log("Formatted Video Duration:", duration);
        //  onFileChange(file, "");
        // };
        onFileChange(file, "");
      }
    } else {
      onFileChange(null, "");
    }
  };

  const onRemove = (file) => {
    setFileList((prevFileList) => {
      const updatedFileList = prevFileList.filter((f) => f.uid !== file.uid);
      return updatedFileList;
    });

    onFileChange(null, "");
  };
  return (
    <Upload beforeUpload={beforeUpload} fileList={fileList} onChange={onChange} onRemove={onRemove}>
      <Button icon={<UploadOutlined />}>Upload video only</Button>
    </Upload>
  );
};
UploadVideo.propTypes = {
  name: PropTypes.string.isRequired,
  onFileChange: PropTypes.func,
  time: PropTypes.string.isRequired,
};
export default UploadVideo;
