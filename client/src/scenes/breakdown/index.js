import React from 'react';
import Header from 'components/Header'
import BreakdownChart from 'components/BreakdownChart'
import {Box} from '@mui/material'

const Breakdown = () => {
  return <Box m="1.5rem 2.5rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category"/>
        <Box mt="40px" height="100vh">
            <BreakdownChart />
        </Box>
    </Box>
}

export default Breakdown;