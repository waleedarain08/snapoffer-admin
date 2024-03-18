import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import Switch from '@mui/material/Switch';
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import * as mutation from "../../graphql/mutation";

export default function EditPackage() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const location = useLocation();
  const [searchField, setSearchField] = useState("");
  const [id, setId] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [photos, setPhoto] = useState(0);
  const [video, setVideo] = useState(0);
  const [story, setStory] = useState(0);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState(1);

  const [editPackage, { data }] = useMutation(mutation?.default?.EDIT_PACKAGE);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleEditPackage = () => {

    if (!id) return;

    const payload = {
      variables: {
        id: parseInt(id, 10),
        name: packageName,
        price: packagePrice,
        photos: parseInt(photos, 10),
        video: parseInt(video, 10),
        story: parseInt(story, 10),
        duration: parseInt(duration, 10),
        status: status,
      }
    };
    editPackage(payload);
  }

  useEffect(() => {
    const data = location?.state?.data;
    if (data) {
      setId(data?.id);
      setPackageName(data?.name ?? "");
      setPackagePrice(data?.price ?? "");
      setPhoto(data?.photos ?? 0);
      setVideo(data?.video ?? 0);
      setStory(data?.story ?? 0);
      setDuration(data?.duration ?? 0);
      setStatus(data?.status ?? 1);
    }
  }, []);

  useEffect(() => {
    if (data?.editPackage?.status) {
      addToast(data?.editPackage?.message, {
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
                  Edit Package
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
                          value={packageName}
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
                          value={packagePrice}
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
                          value={photos}
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
                          value={video}
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
                          value={story}
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
                            Package Expiry in Days
                          </SuiTypography>
                        </SuiBox>
                        <SuiInput
                          onChange={(e) => setDuration(e.target.value)}
                          value={duration}
                          type="number"
                          placeholder="Enter no of days"
                        />
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <SuiBox mt={2} mb={2}>
                      <SuiBox mb={2}>
                        <SuiBox mb={2} ml={0.5}>
                          <SuiTypography component="label" variant="caption" fontWeight="bold">
                            Active
                          </SuiTypography>
                        </SuiBox>
                        <Switch 
                          inputProps={{ 'aria-label': 'Active Package' }} 
                          checked={status == 1}
                          onChange={e => setStatus(e.target.checked ? 1 : 0)} 
                        />
                      </SuiBox>
                    </SuiBox>
                </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <SuiBox mt={4} mb={5}>
                      <SuiButton
                        onClick={handleEditPackage}
                        variant="gradient"
                        color="info"
                        fullWidth
                      >
                        Update
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
