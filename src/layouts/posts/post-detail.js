import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';
import * as utils from "../../graphql/queries";
import moment from "moment";


export default function PostDetail() {
  const [searchField, setSearchField] = useState("");
  const location = useLocation();
  const { data, refetch, loading } = useQuery(utils.default.GET_POST_DETAIL);

  useEffect(() => {
    const postId = location?.state?.data?.id;
    if (postId) {
      refetch({ postId: parseInt(postId, 10) });
    }

  }, []);

  const postData = data?.getPostDetail?.data;

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar onChange={handleChange} />
      {loading ? <CircularProgress />
        :
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12}>
                <ProfileInfoCard
                  title={'Title: ' + postData?.title || 'Na'}
                  description={'Description: ' + postData.description || 'Na'}
                  info={{
                    'Location Title': postData?.locationTitle || 'Na',
                    'Location': postData?.location || 'Na',
                    'Expire Date': postData.expireDate ? moment(postData.expireDate).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData.expireDate).fromNow() : 'Na',
                    'Post Expire Date': postData.postExpireDate ? moment(postData.postExpireDate).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData.postExpireDate).fromNow() : 'Na',
                    'Price': postData?.price || 'Na',
                    'Discount': postData?.discount || 'Na',
                    'Report Count': postData?.reportCount || 'Na',

                    'Comment Count': postData?.commentCount || 'Na',
                    'Approved': postData?.approved ? 'Yes' : 'No',

                    'Created At': postData.createdAt ? moment(postData.createdAt).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData.createdAt).fromNow() : 'Na',
                    'Updated At': postData.updatedAt ? moment(postData.updatedAt).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData.updatedAt).fromNow() : 'Na',
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
            </Grid>
          </SuiBox>
        </SuiBox>
      }


    </DashboardLayout>
  );
}