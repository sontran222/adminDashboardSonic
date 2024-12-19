// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box, Button } from "@mui/material";

//ultis
import { Table } from "antd";
import axios from "axios";
import CustomeDeleteModal from "ultis/CustomDeleteModal";

function Tables() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/films");
        console.log(response.data);

        const filterData = response.data.result.map((item, index) => {
          return {
            index: index + 1,
            id: item.id,
            name: item.name,
            timeModified: item.timeModified,
            slug: item.slug,
          };
        });

        setData(filterData);
      } catch (error) {
        console.log("Lỗi: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleGetData();
  }, []);

  const reloadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/films");
      const filterData = response.data.result.map((item, index) => {
        return {
          index: index + 1,
          id: item.id,
          name: item.name,
          timeModified: item.timeModified,
          slug: item.slug,
        };
      });
      setData(filterData); // Cập nhật lại dữ liệu
    } catch (error) {
      console.log("Lỗi khi tải lại dữ liệu:", error);
    }
  };
  const handleDetail = (record) => {
    navigate(`/quan-ly-phim/chi-tiet/${record.slug}`, { state: { slug: record.slug } });
    console.log(record.slug);
  };

  const handleDelete = (record) => {
    setDeleteInfo({ id: record.id, name: "phim " + record.name });
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      rowScope: "row",
    },
    {
      title: "Tên phim",
      dataIndex: "name",
    },
    {
      title: "Sửa đổi lần cuối",
      dataIndex: "timeModified",
      align: "center",
    },
    {
      title: "Chức năng",
      colSpan: 2,
      dataIndex: "method",
      align: "center",
      render: (_, record) => (
        <Button
          variant="contained"
          color="info"
          sx={{
            background: "#FF9900",
            color: "#FFFFFF",
            "&:hover": {
              color: "#FF9900",
            },
          }}
          onClick={() => handleDetail(record)}
        >
          Chi tiết
        </Button>
      ),
    },
    {
      title: "Chức năng",
      colSpan: 0, //Bỏ tiêu, đề ghép 2 cột thành 1
      dataIndex: "method",
      align: "center",
      render: (_, record) => (
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
          onClick={() => handleDelete(record)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <CustomeDeleteModal
        isOpen={isOpen}
        onClose={handleClosePopup}
        deleteInfo={deleteInfo}
        reloadData={reloadData}
      />
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
                    <Box>Bảng quản lý phim</Box>
                  </Box>
                </MDTypography>
              </MDBox>
              <>
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                  pagination={{ pageSize: 5 }}
                  style={{
                    marginTop: "1rem",
                    padding: "10px 10px",
                  }}
                />
              </>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
