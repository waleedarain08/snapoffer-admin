// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useNavigate, useLocation } from "react-router-dom";

// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { useToasts } from "react-toast-notifications";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import { useMutation } from "@apollo/client";
import * as utils from "../../graphql/mutation";

// Data

function editCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToasts();
  const [newCategory, setnewCategory] = useState("");

  useEffect(() => {
    setnewCategory(location?.state?.data?.name);
  }, []);
  const [Updatecategory, { data }] = useMutation(utils?.default?.ADDUPDATE, {
    variables: {
      updateCategoryId: location?.state?.data?.id,
      name: newCategory,
      index: location?.state?.data?.index,
    },
  });
  useEffect(() => {
    if (data?.updateCategory?.status) {
      addToast(data?.updateCategory?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      navigate("/categorys");
    }
  }, [data]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={6}>
            <Card className="h-100">
              <SuiBox pt={3} px={3}>
                <SuiTypography variant="h6" fontWeight="medium">
                  Edit Category
                </SuiTypography>
                <SuiBox mt={2} mb={2}>
                  <SuiBox mb={2}>
                    <SuiBox mb={2} ml={0.5}>
                      <SuiTypography component="label" variant="caption" fontWeight="bold">
                        Category Name
                      </SuiTypography>
                    </SuiBox>
                    <SuiInput
                      onChange={(e) => setnewCategory(e.target.value)}
                      type="text"
                      value={newCategory}
                      placeholder="Category Name"
                    />
                  </SuiBox>
                </SuiBox>
                <SuiBox mt={4} mb={5}>
                  <SuiButton
                    onClick={() => Updatecategory()}
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Update Category
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default editCategory;
