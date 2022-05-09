import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
// import Switch from "@mui/material/Switch";
import SuiButton from "components/SuiButton";
// import SuiBadge from "components/SuiBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Dot from "assets/images/dot.png";

// Data
// import usersTableData from "layouts/users/data/usersTableData";
import moment from "moment";

import { useQuery } from "@apollo/client";
import * as utils from "../../graphql/queries";

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

export default function Category() {
  const navigate = useNavigate();
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  const { data, refetch } = useQuery(utils?.default?.GETALLCATEGORIES);

  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPersons = data?.getCategories?.data?.filter((row) =>
    row.name?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "Category", align: "left" },
    { name: "Created", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = filteredPersons?.map((row) => ({
    Category: (
      <Author image={`${Dot}`} name={`${row.name !== null ? row.name : ""}`} rowData={row} />
    ),
    Created: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {moment(row.createdAt).format("MM/DD/YYYY")}
      </SuiTypography>
    ),
    action: (
      <>
        <SuiTypography
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/EditCategory", { state: { data: row } });
          }}
          component="a"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SuiTypography>

        <SuiTypography component="a" variant="caption" color="secondary" fontWeight="medium">
          &nbsp;/&nbsp;
        </SuiTypography>
        <SuiTypography
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/EditCategory", { state: { data: row } });
          }}
          component="a"
          variant="caption"
          color="error"
          fontWeight="medium"
        >
          Delete
        </SuiTypography>
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar onChange={handleChange} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">All Categories</SuiTypography>
              <SuiButton
                onClick={() => {
                  navigate("/AddCategory");
                }}
                color="info"
                variant="gradient"
                size="small"
              >
                Add Category
              </SuiButton>
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
