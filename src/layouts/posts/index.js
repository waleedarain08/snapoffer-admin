import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Switch from '@mui/material/Switch';
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";

import Table from "examples/Tables/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import DummyImage from "assets/images/dummy.png";

import moment from "moment";
import TablePagination from 'examples/Tables/Table/table-pagination';
import ConfirmationDialog from 'examples/Dialogs/Confirmation.dialog';

function Author({ image, name, email, rowData }) {
  const navigate = useNavigate();

  const handleOnClick = (user) => {
    navigate('/user-details', { state: { data: user } });
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

function Title({ title, description, rowData }) {
  const navigate = useNavigate();

  const handleOnClick = (post) => {
    navigate(`/posts/detail`, { state: { data: post } });
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
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {title}
        </SuiTypography>
        <SuiTypography variant="caption" color="secondary">
          {description}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function RejectPostSwitch({ id, approved, onRejectPost, refresh }) {

  const [dialog, setDialog] = useState({
    show: false,
    title: null,
    description: null,
    confirmBtnText: null,
  });
  const rejected = !approved ?? false;

  const handleOnChange = (e) => {
    const reject = e.target.checked;

    if (reject) {
      setDialog({ 
        show: true, 
        title: "Confirmation", 
        description: "Please specify the reason why you want to disapprove this post ?",
        confirmBtnText: 'Reject'
      });
      return;
    }

    /* approve the post and set rejected reason to null */
    const payload = { variables: { postId: id, approved: true, rejectedReason: null } };
    onRejectPost(payload);
    if (refresh && typeof refresh === 'function') refresh();
  }

  const handleSubmit = ({ text }) => {
    const payload = { variables: { postId: id, approved: false, rejectedReason: text } };
    onRejectPost(payload);
    if (refresh && typeof refresh === 'function') refresh();
    /* close the dialog */
    setDialog({ show: false, title: null, description: null, confirmBtnText: null });
  }

  const handleCancel = () => {
    /* close the dialog */
    setDialog({ show: false, title: null, description: null, confirmBtnText: null });
  }


  return (
    <React.Fragment>
      <ConfirmationDialog {...dialog} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
      <Switch 
        inputProps={{ 'aria-label': 'Reject Post' }} 
        checked={rejected}
        onChange={handleOnChange} 
      />
    </React.Fragment>
  )
}

function ShowTopSwitch({ id, showTop, onUpdatePost, refresh }) {

  const handleOnChange = (e) => {
    const checked = e.target.checked;

    /* set the show top flag to true */
    const payload = { variables: { postId: id, showTop: checked } };
    onUpdatePost(payload);
    if (refresh && typeof refresh === 'function') refresh();
  }

  return (
    <React.Fragment>
      <Switch 
        inputProps={{ 'aria-label': 'Show on top' }} 
        checked={showTop ?? false}
        onChange={handleOnChange} 
      />
    </React.Fragment>
  )
}


const getFullName = (user) => {
  if (!user) return "Na";
  return `${user.firstName} ${user.lastName}`.trim();
}

const PER_PAGE_ITEMS = 10;
const DEFAULT_PAGINATION_PARAMS = { total: 1, currentPage: 1, perPage: PER_PAGE_ITEMS };

export default function Posts() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  const { data, refetch } = useQuery(utils?.default?.GET_ALL_POSTS);
  const [ approveDisapprovePost ] = useMutation(mutation?.default?.APPROVE_DISAPPROVE_POST);
  const [ updatePost ] = useMutation(mutation?.default?.UPDATE_POST);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') && parseInt(searchParams.get('page'));
    const isNaN = Number.isNaN(page);
    if (!isNaN) {
      setCurrentPage(page);
    }

    refetch({
      pagination: {
        perPage: PER_PAGE_ITEMS,
        page: !isNaN ? page : 1, /* defaults loads first page data */
      }
    });
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleOnPageChange = (page) => {
    /* update search param */
    searchParams.set('page', page);
    setSearchParams(searchParams, { replace: true });

    setCurrentPage(page);
    refetch({
      pagination: {
        perPage: PER_PAGE_ITEMS,
        page: page
      }
    });
  }

  const refreshPageData = () => {
    refetch({
      pagination: {
        perPage: PER_PAGE_ITEMS,
        page: currentPage
      }
    });
  }

  const filteredPersons = data?.getAllPosts?.data?.filter((row) =>
    row.title?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "User", align: "left" },
    { name: "Title", align: "left" },
    { name: "Price", align: "left" },
    { name: "Discount", align: "left" },
    { name: "Report Count", align: "left" },
    //{ name: "Expiry", align: "left" },
    { name: "Created", align: "left" },
    { name: "Rejected Reason", align: "left" },
    { name: "Rejected", align: "center" },
    { name: 'Show Top', align: "center" },
  ];

  const rows = filteredPersons?.map((row) => ({
    Title: (
      <Title 
        title={`${row.title !== null ? row.title : ""}`} 
        description=""
        rowData={row} 
      />
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
    // Expiry: (
    //   <SuiTypography variant="caption" color="secondary" fontWeight="medium">
    //     {moment(row.postExpireDate).format("MM/DD/YYYY")}
    //   </SuiTypography>
    // ),
    Created: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {moment(row.createdAt).format("MM/DD/YYYY")}
      </SuiTypography>
    ),
    'Rejected Reason':(
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {row?.rejectedReason || '-'}
      </SuiTypography>
    ), 
    Rejected: <RejectPostSwitch {...row} onRejectPost={approveDisapprovePost} refresh={refreshPageData} />,
    'Show Top': (
      <ShowTopSwitch {...row} onUpdatePost={updatePost} refresh={refreshPageData} />
    ),
  }));

  const pagination = data?.getAllPosts?.pagination || DEFAULT_PAGINATION_PARAMS;

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
            <SuiBox mb={2} mt={2} mr={2}>
              <TablePagination page={currentPage} pages={pagination.total} onPageChange={handleOnPageChange} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>

    </DashboardLayout>
  );
}