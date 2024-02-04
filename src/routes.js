// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
// import Billing from "layouts/billing";
import Category from "layouts/categorys";
import AddCategory from "layouts/categorys/addCategory";
import EditCategory from "layouts/categorys/editCategory";
import Packages from 'layouts/packages';
import AddPackage from 'layouts/packages/add-package';

import Posts from 'layouts/posts';
import PostDetail from 'layouts/posts/post-detail';

// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import BusinessUserList from "layouts/users/BusinessUserList";
import CustomerUserList from "layouts/users/CustomerUserList";
import UserDetails from "layouts/users/userProfile/userDetails";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
// import Settings from "examples/Icons/Settings";
// import Document from "examples/Icons/Document";
// import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Subcategories from "layouts/subcategories";
import Editsubcategory from "layouts/subcategories/editsubcategory";
import Addsubcategory from "layouts/subcategories/addsubcategory";
// import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Business Users",
    key: "business-users",
    route: "/business-users",
    icon: <Office size="12px" />,
    component: <BusinessUserList />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Customer Users",
    key: "customer-users",
    route: "/customer-users",
    icon: <Office size="12px" />,
    component: <CustomerUserList />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Packages",
    key: "packages",
    route: "/packages",
    icon: <CustomerSupport size="12px" />,
    component: <Packages />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Posts",
    key: "posts",
    route: "/posts",
    icon: <CustomerSupport size="12px" />,
    component: <Posts />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "Post Detail",
    key: "post-detail",
    route: "/posts/detail",
    icon: <CustomerSupport size="12px" />,
    component: <PostDetail />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "Add Package",
    key: "add-package",
    route: "/packages/add",
    icon: <CustomerSupport size="12px" />,
    component: <AddPackage />,
    noCollapse: true,
    isSideBarActive: false,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  //   isSideBarActive: true,
  // },
  {
    type: "collapse",
    name: "Categorys",
    key: "categorys",
    route: "/categorys",
    icon: <CreditCard size="12px" />,
    component: <Category />,
    noCollapse: true,
    isSideBarActive: true,
  },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account Pages", key: "account-pages", isSideBarActive: true },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    isSideBarActive: true,
  },
  {
    type: "collapse",
    name: "UserDetails",
    key: "userDetails",
    route: "/userDetails",
    icon: <CustomerSupport size="12px" />,
    component: <UserDetails />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "AddCategory",
    key: "AddCategory",
    route: "/AddCategory",
    icon: <CustomerSupport size="12px" />,
    component: <AddCategory />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "EditCategory",
    key: "EditCategory",
    route: "/EditCategory",
    icon: <CustomerSupport size="12px" />,
    component: <EditCategory />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "Subcategories",
    key: "Subcategories",
    route: "/Subcategories",
    icon: <CustomerSupport size="12px" />,
    component: <Subcategories />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "Editsubcategory",
    key: "Editsubcategory",
    route: "/Editsubcategory",
    icon: <CustomerSupport size="12px" />,
    component: <Editsubcategory />,
    noCollapse: true,
    isSideBarActive: false,
  },
  {
    type: "collapse",
    name: "Addsubcategory",
    key: "Addsubcategory",
    route: "/Addsubcategory",
    icon: <CustomerSupport size="12px" />,
    component: <Addsubcategory />,
    noCollapse: true,
    isSideBarActive: false,
  },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: <SignIn />,
  //   noCollapse: true,
  //   isSideBarActive: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  //   isSideBarActive: true,
  // },
];

export default routes;
