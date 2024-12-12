// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/FilmManagers/data/authorsTableData";
import Breadcrumbs from "ultis/Breadcrumbs";
import { Box, Button } from "@mui/material";
//Icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

//ultis
import CustomModal from "ultis/CustomModal";
import CustomConfirm from "ultis/CustomConfirm";

function Tables() {
  const { columns, rows } = authorsTableData();
  const [modalState, setModalState] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const handleOpen = (modalName) => {
    setModalState({ ...modalState, [modalName]: true });
  };
  const handleClose = (modalName, value) => {
    setModalState({ ...modalState, [modalName]: value });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {/* phần đầu Bảng quản lý phim*/}
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  <Box>
                    <Box>
                      Bảng quản lý phim
                      <Breadcrumbs></Breadcrumbs>
                    </Box>

                    <Box display="flex" gap={2} justifyContent="space-evenly" flexWrap="wrap">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        sx={{
                          background: "green",
                          color: "#FFFFFF",
                          "&:hover": {
                            color: "green",
                          },
                        }}
                        onClick={() => handleOpen("modal1")}
                      >
                        Khởi tạo phim
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          background: "#FF0000",
                          color: "#FFFFFF",
                          "&:hover": {
                            color: "#FF0000",
                          },
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleOpen("modal2")}
                      >
                        Xóa toàn bộ phim
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        startIcon={<ArrowUpwardIcon />}
                        sx={{
                          background: "#FF9900",
                          color: "#FFFFFF",
                          "&:hover": {
                            color: "#FF9900",
                          },
                        }}
                      >
                        Tải lên
                      </Button>
                    </Box>
                  </Box>
                </MDTypography>
              </MDBox>

              {/* Dữ liệu của bảng + tiêu đề */}
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>

              {/* Các nút click */}
              {/* nút tạo folder*/}
              <CustomModal
                open={modalState.modal1}
                onClose={() => handleClose("modal1", false)}
              ></CustomModal>
              {/* nút xóa folder  */}
              <CustomConfirm
                open={modalState.modal2}
                onClose={() => handleClose("modal2", false)}
              ></CustomConfirm>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
