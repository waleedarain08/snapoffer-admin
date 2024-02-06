import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Switch from '@mui/material/Switch';
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import Dot from "assets/images/dot.png";

import Table from "examples/Tables/Table";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import { UserType } from '../../constants';
import DummyImage from "assets/images/dummy.png";

import moment from "moment";

function Author({ image, name, email, rowData }) {
  const navigate = useNavigate();

  const handleOnClick = (user) => {
    let path = null;
    if (user.type === UserType.Business) {
      path = '/business-users';
    }
    
    if (user.type === UserType.Customer) {
      path = '/customer-users';
    }

    /* append search params */
    path = path + `?email=${user.email}`;

    navigate(path, { state: { data: user } });
  };

  return (
    <SuiBox
      display="flex"
      alignItems="center"
      px={1}
      py={0.5}
      onClick={() => handleOnClick(rowData.user)}
      style={{ cursor: "pointer" }}
    >
      <SuiBox mr={2}>
        <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column" >
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

function Title({ image, name, email, rowData }) {
  const navigate = useNavigate();

  const handleOnClick = (post) => {
    navigate(`/posts/detail?id=${post.id}`, { state: { data: post } });
  };

  return (
    <SuiBox
      display="flex"
      alignItems="center"
      px={1}
      py={0.5}
      onClick={() => handleOnClick(rowData)}
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

function ApproveDisapprove({ id, approved, onApproveDisapprove }) {

  const handleOnChange = (e) => {
    const value = e.target.checked;
    const payload = { variables: { postId: id, approved: value } };
    onApproveDisapprove(payload);
  }

  return (
    <Switch 
      inputProps={{ 'aria-label': 'Approve Disapprove Post' }} 
      checked={approved}
      onChange={handleOnChange} 
    />
  )
}

const getFullName = (user) => {
  if (!user) return "Na";
  return `${user.firstName} ${user.lastName}`.trim();
}


export default function Posts() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  const { data, refetch } = useQuery(utils?.default?.GET_ALL_POSTS);
  const [ approveDisapprovePost ] = useMutation(mutation?.default?.APPROVE_DISAPPROVE_POST);


  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPersons = data?.getAllPosts?.data?.filter((row) =>
    row.title?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "Title", align: "left" },
    { name: "User", align: "left" },
    { name: "Price", align: "left" },
    { name: "Discount", align: "left" },
    { name: "Report Count", align: "left" },
    { name: "Expiary", align: "left" },
    { name: "Created", align: "left" },
    { name: "Approved", align: "center" },
  ];

  const rows = filteredPersons?.map((row) => ({
    Title: (
      <Title image={`${Dot}`} name={`${row.title !== null ? row.title : ""}`} rowData={row} />
    ),
    User: (
      <Author 
        image={row?.user?.avatar || DummyImage} 
        name={getFullName(row.user)} 
        email={row?.user?.email || 'Na'}
        rowData={row} 
      />
    ),
    Price: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {row.price}
      </SuiTypography>
    ),
    Discount: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {row.discount}
      </SuiTypography>
    ),
    'Report Count': (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {row.reportCount}
      </SuiTypography>
    ),
    Expiary: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {moment(row.postExpireDate).format("MM/DD/YYYY")}
      </SuiTypography>
    ),
    Created: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {moment(row.createdAt).format("MM/DD/YYYY")}
      </SuiTypography>
    ),
    Approved: <ApproveDisapprove {...row} onApproveDisapprove={approveDisapprovePost} />,
  }));


  return (
    <DashboardLayout>
      <DashboardNavbar onChange={handleChange} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Posts</SuiTypography>
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