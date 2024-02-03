import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import * as mutation from "../../graphql/mutation";


export default function AddPackage() {

  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [searchField, setSearchField] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");

  const [addPackage, { data }] = useMutation(mutation?.default?.ADD_PACKAGE);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleAddPackage = () => {
    const payload = { 
      variables: {
        name: packageName,
        price: "$" + packagePrice,
        photos: 1,
        status: 1,
        duration: 1,
        story: 1,
        video: 1
      }
    };
    addPackage(payload);
  }

  useEffect(() => {
    if (data?.addNewPackage?.status) {
      addToast(data?.addNewPackage?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      navigate("/packages");
    }
  }, [data]);

  return (
    <DashboardLayout>
      <DashboardNavbar onChange={handleChange} />
      <SuiBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card className="h-100">
              <SuiBox pt={3} px={3}>
                <SuiTypography variant="h6" fontWeight="medium">
                  Add New Package
                </SuiTypography>
                <SuiBox mt={2} mb={2}>
                  <SuiBox mb={2}>
                    <SuiBox mb={2} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Package Name
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput
                      onChange={(e) => setPackageName(e.target.value)}
                      type="text"
                      placeholder="Package Name"
                    />
                  </SuiBox>
                </SuiBox>
                <SuiBox mt={2} mb={2}>
                  <SuiBox mb={2}>
                    <SuiBox mb={2} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Package Price
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput
                      onChange={(e) => setPackagePrice(e.target.value)}
                      type="text"
                      placeholder="Package Price"
                    />
                  </SuiBox>
                </SuiBox>
                <SuiBox mt={4} mb={5}>
                  <SuiButton
                    onClick={handleAddPackage}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Add Package
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  )
}