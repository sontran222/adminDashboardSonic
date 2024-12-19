// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// mui
import { Box, Button } from "@mui/material";

//antd
import { DatePicker, Dropdown, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

//ultis
import AutoCompleteCountries from "ultis/AutoComplete";
import UploadImage from "ultis/UploadImage";
import Alert from "ultis/Alert";

function Tables() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    originName: "",
    year: 1999,
    chieurap: false,
    content: "",
    Thumb: "",
    Poster: "",
    genreSlug: "phim-le",
    countryName: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeYearPicker = (year) => {
    setFormData({
      ...formData,
      year: year.$y,
    });
  };

  // Xử lý chọn phim chiếu rạp
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      chieurap: value === "true", //1 kiểu so sánh để trả ra 1 hoặc 0 vì value: "true" là chuỗi "true"
    });
  };

  const handleSelectGenre = (value) => {
    setFormData({
      ...formData,
      genreSlug: value,
    });
  };

  const handleChangeCountry = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý thay đổi ảnh
  const handleFileChange = (name, file) => {
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const SaveFilm = async () => {
    const formDataFilm = new FormData();

    formDataFilm.append("name", formData.name);
    formDataFilm.append("originName", formData.originName);
    formDataFilm.append("year", formData.year);
    formDataFilm.append("chieurap", formData.chieurap);
    formDataFilm.append("genreSlug", formData.genreSlug);
    formDataFilm.append("Thumb", formData.Thumb);
    formDataFilm.append("Poster", formData.Poster);

    try {
      //film
      const responseFilm = await axios.post("http://localhost:8080/api/films", formDataFilm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(responseFilm);

      let slugFilm;
      slugFilm = responseFilm.data.result.slug;

      //phần descriptions
      console.log("slugFilm: ", slugFilm);
      const JsonDesciption = {
        slug: slugFilm,
        content: formData.content,
      };

      const responseDes = await axios.post(
        "http://localhost:8080/api/descriptions",
        JsonDesciption,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(responseDes.data);

      //Phần country
      const JsonCountry = {
        slug: slugFilm,
        countryName: formData.countryName,
      };
      console.log(JsonCountry);
      const responseCountry = await axios.post("http://localhost:8080/api/countries", JsonCountry, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(responseCountry.data);
      setSuccess("Cập nhật phim thành công");
      navigate(`/quan-ly-phim/chi-tiet/${slugFilm}`, {
        state: { slug: slugFilm, show: true },
      });
    } catch (error) {
      console.log("Có lỗi xảy ra: ", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
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
                {error && <Alert show={true} type={"error"} message={error} />}
                {success && <Alert show={true} type={"success"} message={success} />}

                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Tên phim:
                      </span>
                      <Input
                        placeholder="Ví dụ: Đặc vụ 007"
                        name="name"
                        value={formData.name}
                        onChange={handleChangeFormData}
                      />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Tên ban đầu:
                      </span>
                      <Input
                        placeholder="Ví dụ: Spyder 007"
                        name="originName"
                        value={formData.originName}
                        onChange={handleChangeFormData}
                      />
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Mô tả phim:
                      </span>
                      <TextArea
                        rows={4}
                        name="content"
                        placeholder="Mô tả ngắn về phim"
                        value={formData.content}
                        onChange={handleChangeFormData}
                      />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <span
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "700",
                          marginRight: 10,
                        }}
                      >
                        Ảnh ngang:
                      </span>
                      <UploadImage name="Thumb" onFileChange={handleFileChange}></UploadImage>
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
                        value={formData.chieurap ? "true" : "false"}
                        style={{ width: "100%" }}
                        onChange={handleSelectChange}
                      >
                        <Select.Option value="true">Có</Select.Option>
                        <Select.Option value="false">Không</Select.Option>
                      </Select>
                    </Box>

                    <Box>
                      <span style={{ color: "black", fontSize: "1rem", fontWeight: "700" }}>
                        Thể loại
                      </span>
                      <Select
                        defaultValue="phim-le"
                        onChange={handleSelectGenre}
                        style={{ width: "100%" }}
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
                      <AutoCompleteCountries
                        name="countryName"
                        OnChangeCountry={handleChangeCountry}
                      />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <span
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "700",
                          marginRight: 10,
                        }}
                      >
                        Ảnh dọc:
                      </span>
                      <UploadImage name="Poster" onFileChange={handleFileChange}></UploadImage>
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
