import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SuiBox from "components/SuiBox";
import Grid from "@mui/material/Grid";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import CircularProgress from '@mui/material/CircularProgress';
import SuiTypography from "components/SuiTypography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";


import { useQuery, useMutation } from "@apollo/client";
import { useLocation } from 'react-router-dom';
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import moment from "moment";
import Comments from './comment';
import Tags from './tags';
import PostMedia from './media';


export default function PostDetail() {
  const [searchField, setSearchField] = useState("");
  const location = useLocation();
  const { data, refetch, loading } = useQuery(utils.default.GET_POST_DETAIL);
  const { data: categoriesData, refetch: refetchCategoriesData } = useQuery(utils?.default?.GETALLCATEGORIES, {
    variables: {
      where: {
        parentId: null,
      },
    },
  });

  useEffect(() => {
    reloadPageData();
  }, []);

  const reloadPageData = () => {
    const postId = location?.state?.data?.id;
    if (postId) {
      refetch({ postId: parseInt(postId, 10) });
    }
  }

  const postData = data?.getPostDetail?.data;

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const Category = ({ post, categories, refreshData }) => {
    const [value, setValue] = useState(post?.user?.business?.category ?? null);

    const [ updateBusiness ] = useMutation(mutation?.default?.UPDATE_BUSINESS);

    const handleChange = (event) => {
      const businessId = post?.user?.business?.id ?? 0;

      if (businessId == 0) {
        alert('Not a business post.');
        return;
      }

      const value = event.target.value;

      const payload = { variables: { businessId: businessId, category: value } };
      updateBusiness(payload);
      setTimeout(() => refreshData(), 400);
    };

      return <select name="select-category" id="select-category" style={{ minWidth: '140px' }} value={value} onChange={handleChange} >
        <option value={"1"}>None</option>
        {categories?.map((item) => <option value={item.name} >{item.name}</option>)}
    </select>


  }

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
                  description={'Description: ' + postData?.description || 'Na'}
                  info={{
                    'Location Title': postData?.locationTitle || 'Na',
                    'Location': postData?.location || 'Na',
                    'Expire Date': postData?.expireDate ? moment(postData.expireDate).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData.expireDate).fromNow() : 'Na',
                    'Post Expire Date': postData?.postExpireDate ? moment(postData?.postExpireDate).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData?.postExpireDate).fromNow() : 'Na',
                    'Price': postData?.price || 'Na',
                    'Show Top': postData?.showTop ? 'True': 'False',
                    'Discount': postData?.discount || 'Na',
                    'Report Count': postData?.reportCount || 'Na',

                    'Comment Count': postData?.comments?.length || 'Na',
                    'Rejected': !postData?.approved ? 'Yes' : 'No',
                    'Rejected Reason': postData?.rejectedReason ?? '-',
                    'Tags': <Tags tags={postData?.tags || []} />,
                    'Created At': postData?.createdAt ? moment(postData?.createdAt).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData?.createdAt).fromNow() : 'Na',
                    'Updated At': postData?.updatedAt ? moment(postData?.updatedAt).format("MM/DD/YYYY hh:mm:A") + ' - ' + moment(postData?.updatedAt).fromNow() : 'Na',
                    'Category': <Category post={postData} categories={categoriesData?.getCategories?.data || []} refreshData={reloadPageData} />,
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
                <Card>
                  <SuiBox pb={2} px={2} lineHeight={1.25}>
                    <SuiTypography mt={2} variant="h5" fontWeight="medium" textTransform="capitalize">
                      Media
                    </SuiTypography>
                    <Divider />
                    <PostMedia media={postData?.media || []} />
                  </SuiBox>
                </Card>
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
                <Card>
                  <SuiBox pb={2} px={2} lineHeight={1.25}>
                    <SuiTypography mt={2} variant="h5" fontWeight="medium" textTransform="capitalize">
                      Comments
                    </SuiTypography>
                    <Divider />
                    <Comments comments={postData?.comments || []} />
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </SuiBox>
      }


    </DashboardLayout>
  );
}