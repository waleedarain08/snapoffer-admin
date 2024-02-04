import React, { useState, useEffect } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import CircularProgress from '@mui/material/CircularProgress';
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import Table from "examples/Tables/Table";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import { useSearchParams } from 'react-router-dom';
import * as utils from "../../graphql/queries";
import * as mutation from "../../graphql/mutation";
import moment from "moment";


export default function PostDetail() {
  const [searchField, setSearchField] = useState("");
  const [ searchParams ] = useSearchParams();
  const { data, refetch, loading } = useQuery(utils.default.GET_POST_DETAIL); 

  useEffect(() => {

    const postId = searchParams.get('id');
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
      { loading ? <CircularProgress /> 
      : 
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <SuiTypography>
            Id: {postData?.id || 'Na'}
          </SuiTypography>
          <SuiTypography>
            Title: {postData?.title || 'Na'}
          </SuiTypography>
          <SuiTypography>
            Description: {postData?.description || 'Na'}
          </SuiTypography>
          <SuiTypography>
            JSON: { postData ? JSON.stringify(postData, null, 2) : 'Na'}
          </SuiTypography>
        </SuiBox>
      </SuiBox>      
      }


    </DashboardLayout>
  );
}