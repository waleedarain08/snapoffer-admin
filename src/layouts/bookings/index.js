import React, {useState, useEffect} from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";
import SuiTypography from "components/SuiTypography";
import Table from "examples/Tables/Table";
import DummyImage from "assets/images/dummy.png";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import moment from "moment";

function Author({ image, name, email, rowData }) {
  const navigate = useNavigate();

  const handleOnClick = (user) => {
    return; /* do nothing. */
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

export default function Bookings() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  const { data, refetch } = useQuery(utils?.default?.GET_BOOKINGS);
  const [deleteBooking, { data: deleteBookingData }] = useMutation(mutation?.default?.DELETE_BOOKING);

  useEffect(() => {
    if (deleteBookingData?.deleteBooking?.status) {
      addToast(deleteBookingData?.deleteBooking?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      refetch();
    }
  }, [deleteBookingData]);

  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPersons = data?.getBooking?.data?.filter((row) =>
    row.email?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "User", align: "left" },
    { name: "Code", align: "left" },
    { name: "Phone", align: "left" },
    { name: "City", align: "center" },
    { name: "Redeem_Status", align: "center" },
    { name: "action", align: "center" },
  ];

  const handleDeleteBooking = (id) => {
    const answer = window.confirm("Are you sure you want to delete this booking");
    if (answer) {
      deleteBooking({
        variables: {
          bookingId: id,
        },
      });
    }
  };

  const rows = filteredPersons?.map((row) => ({
    User: (<Author 
      image={row.avatar || DummyImage} 
      name={`${row.firstName} ${row.lastName}`} 
      email={row.email} 
      rowData={row} 
    />),
    Code: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
      { row.code }
    </SuiTypography>
    ),
    Phone: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
      { row.phoneNumber }
    </SuiTypography>
    ),
    City: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {(row.city)}
      </SuiTypography>
    ),
    Redeem_Status: (
      <SuiTypography variant="caption" color="secondary" fontWeight="medium">
        {(row.redeem?"Yes":"No")}
      </SuiTypography>
    ),
    action: (
      <>
        <SuiTypography
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteBooking(row?.id)}
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
            <SuiTypography variant="h6">Bookings</SuiTypography>
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

  )
}