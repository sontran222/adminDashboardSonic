import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import UploadVideo from "ultis/UploadVideo";
import PropTypes from "prop-types";
import axios from "axios";

const CustomModalEpisode = ({ isOpen, onClose, slug, folderIdParent }) => {
  const [EpisodeInfo, setEpisodeInfo] = useState({
    episodeFilm: "",
    time: "",
    videoFile: null,
    slug: slug,
    folderIdParent: folderIdParent,
  });

  const [alert, setAlert] = useState(false);

  const handleInputChange = (event) => {
    setEpisodeInfo({
      ...EpisodeInfo,
      episodeFilm: event.target.value,
    });
  };

  const handleOnOk = async () => {
    const formDataEpisode = new FormData();

    formDataEpisode.append("slug", EpisodeInfo.slug);
    formDataEpisode.append("episodeFilm", EpisodeInfo.episodeFilm);
    formDataEpisode.append("time", EpisodeInfo.time);
    formDataEpisode.append("videoFile", EpisodeInfo.videoFile);
    formDataEpisode.append("folderIdParent", EpisodeInfo.folderIdParent);
    console.log(EpisodeInfo);
    try {
      const responseEpisode = await axios.post(
        "http://localhost:8080/api/episodes",
        formDataEpisode,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(responseEpisode.data);

      onClose();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleFileChange = (file, duration) => {
    setEpisodeInfo((prevState) => ({
      ...prevState,
      videoFile: file,
      time: duration,
    }));
  };

  return (
    <>
      <Modal title="Thêm tập mới" open={isOpen} onOk={handleOnOk} onCancel={onClose}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontWeight: 600 }}>Nhập tập:</span>
          <Input placeholder="1" onChange={handleInputChange} />
          <span style={{ fontWeight: 600 }}>Video:</span>
          <UploadVideo onFileChange={handleFileChange} />
        </div>
      </Modal>
    </>
  );
};

CustomModalEpisode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  folderIdParent: PropTypes.string.isRequired,
};

export default CustomModalEpisode;
