import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import axios from "axios";

const CustomeDeleteModal = ({ isOpen, onClose, deleteInfo, reloadData }) => {
  const handleOk = async () => {
    await handleDelete(deleteInfo.id);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = async (deleteId) => {
    try {
      const responseDel = await axios.delete(`http://localhost:8080/api/films/delete/${deleteId}`);
      console.log(responseDel);
      reloadData();
    } catch (error) {
      console.log("Lỗi: ", error);
    }
  };

  return (
    <Modal title="Xác nhận xóa" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Bạn có muốn xóa không {deleteInfo.name}?</p>
    </Modal>
  );
};

CustomeDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deleteInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  reloadData: PropTypes.func.isRequired,
};

export default CustomeDeleteModal;
