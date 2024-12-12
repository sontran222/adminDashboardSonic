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
import authorsTableData from "layouts/AddFilms/data/authorsTableData";
import Breadcrumbs from "ultis/Breadcrumbs";
import { Box, Button, Paper, TextField } from "@mui/material";
//Icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

//ultis
import CustomModal from "ultis/CustomModal";
import CustomConfirm from "ultis/CustomConfirm";
import { Margin, WidthFull } from "@mui/icons-material";
import Select from "ultis/Select";
import AutoCompleteCountries from "ultis/AutoComplete";
import UploadImage from "ultis/UploadImage";
//antd
import { DatePicker, Dropdown, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DownOutlined } from "@ant-design/icons";

function Tables() {
  const { columns, rows } = authorsTableData();
  const [modalState, setModalState] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const onChangeYearPicker = (YearString) => {
    console.log(YearString);
  };

  const items = [
    {
      label: "Không",
      key: "false",
    },
    {
      label: "Có",
      key: "true",
    },
  ];
  const onClickSelect = (value) => {
    console.log(`selected ${value}`);
  };

  const SaveFilm = () => {
    console.log("Save");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {/* phần đầu màu xanh*/}
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
                    <Box>Thêm phim mới</Box>
                  </Box>
                </MDTypography>
              </MDBox>

              {/* Phần nhập nội dung */}
              <MDBox pt={3} px={2}>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Tên phim:
                      </span>
                      <Input placeholder="Ví dụ: Đặc vụ 007" />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Tên ban đầu:
                      </span>
                      <Input placeholder="Ví dụ: Spyder 007" />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Mô tả phim:
                      </span>
                      <TextArea rows={4} />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Ảnh ngang
                      </span>
                      <UploadImage></UploadImage>
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Năm phát hành:
                      </span>
                      <DatePicker
                        onChange={onChangeYearPicker}
                        picker="year"
                        style={{ width: "100%" }}
                      />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Phim chiếu rạp:
                      </span>
                      <Select
                        defaultValue="false"
                        onChange={onClickSelect}
                        options={[
                          {
                            value: "true",
                            label: "Có",
                          },
                          {
                            value: "false",
                            label: "Không",
                          },
                        ]}
                      ></Select>
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Thể loại
                      </span>
                      <Select
                        defaultValue="phim-le"
                        onChange={onClickSelect}
                        options={[
                          {
                            value: "phim-le",
                            label: "Phim lẻ",
                          },
                          {
                            value: "phim-bo",
                            label: "Phim bộ",
                          },
                          {
                            value: "hoat-hinh",
                            label: "Hoạt hình",
                          },
                          {
                            value: "tv-show",
                            label: "TV show",
                          },
                        ]}
                      />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Quốc gia
                      </span>
                      <AutoCompleteCountries />
                    </Box>
                  </Grid>
                </Grid>
                {/* Button lưu */}
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    background: "rgb(26, 115, 232)",
                    color: "#FFFFFF",
                    marginTop: 2,
                    marginBottom: 2,
                    "&:hover": {
                      color: "rgb(26, 115, 232)",
                    },
                  }}
                  onClick={() => SaveFilm()}
                >
                  Lưu
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
