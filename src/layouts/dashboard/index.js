// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Customers" }}
                count="4"
               // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Businesses" }}
                count="1"
               // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Categories" }}
                count="12"
                //percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Posts" }}
                count="5"
                //percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        {/* <SuiBox mb={3}>
          <Grid container spacing={3}>
           
          </Grid>
        </SuiBox> */}
        {/* <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SuiTypography>
                    </SuiTypography>
                  </SuiBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SuiBox> */}
        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
