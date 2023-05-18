// ** MUI Imports
import Grid from "@mui/material/Grid";
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
// ** Icons Imports
import Poll from "mdi-material-ui/Poll";

// ** Custom Components Imports
import CardStatisticsVerticalComponent from "@app/src/_start/@core/components/card-statistics/card-stats-vertical";
// ** Styled Component Import
import ApexChartWrapper from "@app/src/_start/@core/styles/libs/react-apexcharts";
import { getServerSidePropsWithSession } from "@app/src/_start/middlewares/with-auth";
import DepositWithdraw from "@app/src/views/dashboard/DepositWithdraw";
import SalesByCountries from "@app/src/views/dashboard/SalesByCountries";
import StatisticsCard from "@app/src/views/dashboard/StatisticsCard";
// ** Demo Components Imports
import Table from "@app/src/views/dashboard/Table";
import TotalEarning from "@app/src/views/dashboard/TotalEarning";
import Trophy from "@app/src/views/dashboard/Trophy";
import WeeklyOverview from "@app/src/views/dashboard/WeeklyOverview";

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$25.6k"
                icon={<Poll />}
                color="success"
                trendNumber="+42%"
                title="Total Profit"
                subtitle="Weekly Profit"
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="$78"
                title="Refunds"
                trend="negative"
                color="secondary"
                trendNumber="-15%"
                subtitle="Past Month"
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="862"
                trend="negative"
                trendNumber="-18%"
                title="New Project"
                subtitle="Yearly Project"
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="15"
                color="warning"
                trend="negative"
                trendNumber="-18%"
                subtitle="Last Week"
                title="Sales Queries"
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export const getServerSideProps = getServerSidePropsWithSession((data) => ({
  subscription: data,
}));

export default Dashboard;
