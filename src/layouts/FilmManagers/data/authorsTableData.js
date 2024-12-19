/* eslint-disable react/prop-types */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";

// Material ui
import { Box, Button } from "@mui/material";

//icon
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function data() {
  // Lấy phần mở rộng
  const getFilePath = (name) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  };
  //Định nghĩa ảnh
  const isImage = (extension) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];
    return imageExtensions.includes(extension.toLowerCase());
  };
  //Định nghĩa video
  const isVideo = (extension) => {
    const videoExtensions = ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm", "m4v"];
    return videoExtensions.includes(extension.toLowerCase());
  };
  //Định nghĩa những file khác
  const isDocument = (extension) => {
    const documentExtensions = ["doc", "docx", "pdf", "txt", "xls", "xlsx", "ppt", "pptx"];
    return documentExtensions.includes(extension.toLowerCase());
  };

  //Lấy đuôi đường dẫn để sử dụng icon
  const FolderName = ({ name }) => {
    const parts = getFilePath(name);
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        {isImage(parts) ? (
          <>
            <ImageIcon></ImageIcon>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
              </MDTypography>
            </MDBox>
          </>
        ) : isVideo(parts) ? (
          <>
            <OndemandVideoIcon></OndemandVideoIcon>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
              </MDTypography>
            </MDBox>
          </>
        ) : isDocument(parts) ? (
          <>
            <AssignmentIcon></AssignmentIcon>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
              </MDTypography>
            </MDBox>
          </>
        ) : (
          <>
            <FolderIcon></FolderIcon>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
              </MDTypography>
            </MDBox>
          </>
        )}
      </MDBox>
    );
  };
  const Method = () => (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <Button
        sx={{
          color: "#000000",
          background: "#FFFFFF",
          border: "1px solid black",
          "&:hover": {
            color: "#FFFFFF",
            background: "#000000",
          },
        }}
        color="error"
      >
        Chi tiết
      </Button>
      <Button
        sx={{
          color: "#FFFFFF",
          background: "#FF0000",
          "&:hover": {
            color: "#FF0000",
          },
        }}
        color="error"
      >
        Xóa
      </Button>
    </Box>
  );
  const DateTime = ({ time }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {time}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Tên", accessor: "ItemName", width: "45%", align: "left" },
      { Header: "Sửa đổi lần cuối", accessor: "Time", align: "left" },
      { Header: "Chức năng", accessor: "Method", align: "center" },
    ],

    rows: [
      {
        ItemName: <FolderName image={team2} name="John Michael" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
      {
        ItemName: <FolderName image={team2} name="John Michael.png" />,
        Time: <DateTime time="11/12/2024" />,
        Method: <Method></Method>,
      },
    ],
  };
}
