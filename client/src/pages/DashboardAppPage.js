import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Container, Typography } from '@mui/material';
// sections

import { AppTasks, AppTime, PerformanceReport, InformationCard } from '../sections/@dashboard/app';
import { fetchDataFromBackend } from '../_mock/fetchDataFromBackend';
import BasicDatePicker from '../layouts/dashboard/header/Calendar';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [gradingCount, setGradingCount] = useState(0);
  const [thinkchatCount, setThinkchatCount] = useState(0);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleUpdateValues = () => {};

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        // Get the token from local storage (change this based on your token storage mechanism)
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        const data = await fetchDataFromBackend(token);

        setGradingCount(data.gradingCountDaily.grading_count_daily);
        setThinkchatCount(data.thinkchatCountDaily.tickets_solved);
        setSatisfactionScore(data.satisfactionScoreDaily.satisfaction_score);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container sx={{ display: 'inline-flex' }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'inline-flex', gap: 2, mt: 2, mb: 2 }}>
            <BasicDatePicker labeltext="start" value={startDate} onChange={(date) => setStartDate(date)} />
            <BasicDatePicker labeltext="end" value={endDate} onChange={(date) => setEndDate(date)} />
            <Button variant="contained" color="secondary" onClick={handleUpdateValues}>
              Apply
            </Button>
          </Box>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Grading" total={gradingCount} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Thinkchat" total={thinkchatCount} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InformationCard title="Satisfaction score" total={satisfactionScore} text="%" color="info" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <PerformanceReport
              title="Performance Report"
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
                { label: 'Time Left', value: 2.5 },
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
