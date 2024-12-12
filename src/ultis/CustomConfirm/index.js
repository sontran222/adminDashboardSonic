import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PropTypes from "prop-types";

export default function AlertDialog({ open, onClose }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bạn có chắc chắn muốn xóa?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa vĩnh viễn folder + ...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Không
          </Button>
          <Button>Đồng ý</Button> {/* Nút này sẽ click dùng để thay đổi*/}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
