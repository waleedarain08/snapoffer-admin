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
  const [photos, setPhoto] = useState(0);
  const [video, setVideo] = useState(0);
  const [story, setStory] = useState(0);
  const [duration, setDuration] = useState(0);

  const [addPackage, { data }] = useMutation(mutation?.default?.ADD_PACKAGE);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleAddPackage = () => {
    const payload = {
      variables: {
        name: packageName,
        price: packagePrice,
        photos: parseInt(photos, 10),
        video: parseInt(video, 10),
        story: parseInt(story, 10),
        duration: parseInt(duration, 10),
        status: 1,
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
                <Grid container columnSpacing={2} >
                  <Grid item xs={12} md={12} lg={12}>
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
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
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
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SuiBox mt={2} mb={2}>
                      <SuiBox mb={2}>
                        <SuiBox mb={2} ml={0.5}>
                          <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Photos
                          </SuiTypography>
                        </SuiBox>
                        <SuiInput
                          onChange={(e) => setPhoto(e.target.value)}
                          type="number"
                          placeholder="Photos"
                        />
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SuiBox mt={2} mb={2}>
                      <SuiBox mb={2}>
                        <SuiBox mb={2} ml={0.5}>
                          <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Video
                          </SuiTypography>
                        </SuiBox>
                        <SuiInput
                          onChange={(e) => setVideo(e.target.value)}
                          type="number"
                          placeholder="Video"
                        />
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SuiBox mt={2} mb={2}>
                      <SuiBox mb={2}>
                        <SuiBox mb={2} ml={0.5}>
                          <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Story
                          </SuiTypography>
                        </SuiBox>
                        <SuiInput
                          onChange={(e) => setStory(e.target.value)}
                          type="number"
                          placeholder="Story"
                        />
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SuiBox mt={2} mb={2}>
                      <SuiBox mb={2}>
                        <SuiBox mb={2} ml={0.5}>
                          <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Duration
                          </SuiTypography>
                        </SuiBox>
                        <SuiInput
                          onChange={(e) => setDuration(e.target.value)}
                          type="number"
                          placeholder="Duration"
                        />
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
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
                  </Grid>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  )
}