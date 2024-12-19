// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { Box } from "@mui/material";

//utils
import TabControl from "ultis/TabControl";
import Alert from "ultis/Alert";

function FilmDetails() {
  const location = useLocation();
  const { slug, show } = location.state || {};

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (show) {
      setSuccess(true);
    }
  }, [show]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {setSuccess && (
          <Alert show={success} type={"success"} message={"Cập nhật phim thành công"} />
        )}
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
                    <Box>Bảng chi tiết</Box>
                  </Box>
                </MDTypography>
              </MDBox>
              <MDBox mt={2} px={2}>
                <TabControl slug={slug}></TabControl>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

FilmDetails.proptype = {
  slug: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default FilmDetails;
