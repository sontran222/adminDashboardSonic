import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import FilmManagers from "layouts/FilmManagers";
import AddFilms from "layouts/AddFilms";
import FilmDetails from "layouts/FilmDetails";
// @mui icons
import Icon from "@mui/material/Icon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { TeamOutlined } from "@ant-design/icons";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Trang chủ",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  //   hidden: false,
  // },
  {
    type: "collapse",
    name: "Phim",
    icon: <MovieCreationIcon />,
    hidden: false,
    subRoutes: [
      {
        type: "collapse",
        name: "Quản lý phim",
        key: "quan-ly-phim",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/quan-ly-phim",
        component: <FilmManagers />,
        hidden: false,
      },
      {
        type: "collapse",
        name: "Thêm phim mới",
        key: "quan-ly-phim/them-moi",
        route: "/quan-ly-phim/them-moi",
        icon: <ControlPointIcon />,
        component: <AddFilms />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Danh sách phim",
    key: "quan-ly-phim/chi-tiet",
    route: "/quan-ly-phim/chi-tiet/:name",
    icon: <ChecklistIcon />,
    component: <FilmDetails />,
    hidden: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  {
    type: "collapse",
    name: "Thông báo",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/thong-bao",
    component: <Notifications />,
    hidden: true, // Không hiển thị trong SideNav
  },
  {
    type: "collapse",
    name: "User",
    key: "UserManage",
    icon: <TeamOutlined />,
    route: "/user",
    component: "",
    hidden: false,
  },
  // {
  //   type: "collapse",
  //   name: "Hồ sơ",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Đăng nhập",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Đăng ký",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  // {
  //   type: "collapse",
  //   name: "Danh sách phim",
  //   key: "quan-ly-phim/danh-sach",
  //   route: "/quan-ly-phim/danh-sach",
  //   icon: <ChecklistIcon />,
  //   component: <Profile />,
  // },
];

export default routes;
