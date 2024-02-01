import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
// import Switch from "@mui/material/Switch";
// import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import dummy from "assets/images/dummy.png";

// Data
// import usersTableData from "layouts/users/data/usersTableData";
import moment from "moment";

import { useQuery } from "@apollo/client";
import * as utils from "../../graphql/queries";
import { UserType } from '../../constants';

function Author({ image, name, email, rowData }) {
  const navigate = useNavigate();
  const moveit = (alldata) => {
    navigate("/userDetails", { state: { data: alldata } });
  };
  return (
    <SuiBox
      display="flex"
      alignItems="center"
      px={1}
      py={0.5}
      onClick={() => moveit(rowData)}
      style={{ cursor: "pointer" }}
    >
      <SuiBox mr={2}>
        <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
        <SuiTypography variant="caption" color="secondary">
          {email}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Function({ city, country }) {
  console.log(country);
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {city}
      </SuiTypography>
      {/* <SuiTypography variant="caption" color="secondary">
        {country}
      </SuiTypography> */}
    </SuiBox>
  );
}

// const checked = () => {
//   alert("asd");
// };

export default function BusinessUserList() {
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  // const [followsMe, setFollowsMe] = useState(true);
  const { data } = useQuery(utils?.default?.GETUSERSWHERE, {
    variables: {
      where: {
        type: UserType.Business
      }
    }
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPersons = data?.getAllUsers?.data?.filter(
    (row) =>
      row.firstName?.toLowerCase()?.includes(searchField?.toLowerCase()) ||
      row.lastName?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "FullName", align: "left" },
    { name: "City", align: "left" },
    { name: "PhoneNumber", align: "center" },
    { name: "Created", align: "center" },
    { name: "Type", align: "center" },
  ];

  const rows = filteredPersons?.map((row) => ({
    FullName: (
      <Author
        image={`${row.avatar !== null ? row.avatar : dummy}`}
        name={`${row.firstName !== null ? row.firstName : ""}  ${
          row.lastName !== null ? row.lastName : ""
        }`}
        email={row.email}
        rowData={row}
      />
    ),
    City: <Function city={row.city} />,
    Created: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {moment(row.createdAt).format("DD/MM/YYYY")}
      </SuiTypography>
    ),
    Type: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {row.type}
      </SuiTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar onChange={handleChange} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Business Users</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}
