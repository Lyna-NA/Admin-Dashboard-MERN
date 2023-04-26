import React from 'react';
import { useGetGeographyQuery } from 'state/api';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'state/geoData';

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();

  return (
    <Box m="1.5rem 2rem">
      <Header title="GEOGRAPHY" subtile="Find where your users are located." />
      <Box
        mt="40px"
        height="100vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary[400],
                },
              },
            }}
            data={data}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor={theme.palette.neutral[500]}
            label="properties.name"
            valueFormat=".2s"
            projectionScale={130}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor={theme.palette.neutral[0]}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.primary.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
