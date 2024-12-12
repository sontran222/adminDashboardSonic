import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ open, onClose }) {
  const CancelHandle = () => {
    return onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={CancelHandle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (e) => e.stopPropagation(), // Ngăn click ra ngoài đóng modal
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "#000000" }}>
            Tạo phim ... + mới
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box>
              {/* Textbox 1 */}
              <TextField fullWidth label="Tên Folder" variant="outlined" sx={{ mb: 2 }} />
              {/* Button xác nhận */}
              <>
                <Button sx={{ mt: 2 }} autoFocus>
                  Xác nhận
                </Button>
                <Button sx={{ mt: 2 }} onClick={() => CancelHandle()}>
                  Hủy
                </Button>
              </>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired, // Prop hàm bắt buộc
};
