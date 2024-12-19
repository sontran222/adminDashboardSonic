import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Alert as AntAlert } from "antd";

const Alert = ({ show, type, message }) => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Handle displaying the alert with a timeout
  const setAlertWithTimeout = (type, message) => {
    setAlertInfo({
      show: true,
      type,
      message,
    });

    // Hide the alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({
        ...alertInfo,
        show: false,
      });
    }, 5000);
  };

  useEffect(() => {
    if (show) {
      setAlertWithTimeout(type, message);
    }
  }, [show, type, message]);

  return (
    <div>
      {alertInfo.show && (
        <AntAlert
          message={alertInfo.type === "success" ? "Thành công" : "Lỗi"}
          description={alertInfo.message}
          type={alertInfo.type}
          showIcon
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            width: "460px",
          }}
        />
      )}
    </div>
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
