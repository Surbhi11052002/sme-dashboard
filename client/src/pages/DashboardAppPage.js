// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections

import { AppTasks, AppTime, PerformanceReport, InformationCard } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Grading" total={8} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Thinkchat" total={2} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Satisfaction score" total={50} text="%" color="info" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <PerformanceReport
              title="Performance Report"
              // subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTime
              title="Projected Time: 8 hrs"
              chartData={[
                { label: 'Time Spent', value: 5.5 },
                { label: 'Time', value: 2.5 },
              ]}
              chartColors={[theme.palette.secondary.main, theme.palette.info.main]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
