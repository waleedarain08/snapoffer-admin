import React, {useState, useEffect} from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Table from "examples/Tables/Table";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import moment from "moment";


export default function Packages() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  //   const { columns, rows } = usersTableData;
  const [searchField, setSearchField] = useState("");
  const { data, refetch } = useQuery(utils?.default?.GET_ALL_PACKAGES);
  const [deletePackage, { data: deletePackageData }] = useMutation(mutation?.default?.DELETE_PACKAGE);

  useEffect(() => {
    if (deletePackageData?.deletePackage?.status) {
      addToast(deletePackageData?.deletePackage?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      refetch();
    }
  }, [deletePackageData]);

  useEffect(() => {
    refetch();
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredPersons = data?.getAllPackages?.data?.filter((row) =>
    row.name?.toLowerCase()?.includes(searchField?.toLowerCase())
  );

  const columns = [
    { name: "Name", align: "left" },
    { name: "Price", align: "center" },
    { name: "Created", align: "center" },
    { name: "action", align: "center" },
  ];

  const handleDeletePackage = (id) => {
    const answer = window.confirm("Are you sure you want to delete this package");
    if (answer) {
      deletePackage({
        variables: {
          packageId: id,
        },
      });
    }
  };

  const rows = filteredPersons?.map((row) => ({
    Name: (
      <SuiTypography style={{ paddingLeft: '8px' }} variant="caption" color="secondary" fontWeight="medium">
        { row.name }
      </SuiTypography>
    ),
    Price: (
    <SuiTypography variant="caption" color="secondary" fontWeight="medium">
      { "$" + row.price }
    </SuiTypography>
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
          onClick={() => handleDeletePackage(row?.id)}
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
            <SuiTypography variant="h6">Packages</SuiTypography>
            <SuiButton
              onClick={() => {
                navigate("/packages/add");
              }}
              color="info"
              variant="gradient"
              size="small"
            >
              Add Package
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
  )
}