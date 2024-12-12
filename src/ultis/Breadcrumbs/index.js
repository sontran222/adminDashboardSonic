import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./style/style.scss";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const index = () => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Trang 1
        </Link>
        <Typography sx={{ color: "text.primary" }}>Trang 2</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default index;
