import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Typography,
} from '@mui/material';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import OverviewChart from 'components/OverviewChart';
import BreakdownChart from 'components/BreakdownChart';
import StatBox from 'components/StatBox';
import { useGetDashboardQuery } from 'state/api';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const columns = [
  { field: '_id', headerName: 'ID', flex: 1 },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
  },

  {
    field: 'products',
    headerName: '# of Products',
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const { data, isLoading } = useGetDashboardQuery();
  const mode = useSelector((state) => state.global.mode);


  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        '*::-webkit-scrollbar': {
          width: '10px',
        },
        '*::-webkit-scrollbar-track': {
          background:
            mode === 'light'
              ? theme.palette.secondary[500]
              : theme.palette.primary[300],
        },
        '*::-webkit-scrollbar-thumb': {
          background:
            mode === 'light'
              ? theme.palette.secondary[300]
              : theme.palette.primary[500],
        },
        '*::-webkit-scrollbar-track:hover': {
          background:
            mode === 'light'
              ? theme.palette.secondary[500]
              : theme.palette.primary[500],
        },
      }}
    >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: theme.palette.secondary[300],
              },
            }}
          >
            <DownloadOutlined sx={{ marginRight: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="125px"
        gap="20px"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* START: Row 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since Last Month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        ></StatBox>
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="since Last Month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        ></StatBox>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          p="1rem"
          borderRadius="0.55rem"
          backgroundColor={theme.palette.background.alt}
        >
          <OverviewChart view="sales" isDashboard="true" />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: '26px' }}
            />
          }
        />
        {/* END: Row 1 */}

        {/* START: Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
        {/* END: Row 2 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
