import { Image } from "antd";
import React from "react";
import PropTypes from "prop-types";

const ShowImage = ({ srcImg }) => {
  return <Image width={200} src={srcImg} />;
};

ShowImage.propTypes = {
  srcImg: PropTypes.string.isRequired,
};

export default ShowImage;
