import { useEffect, useState } from 'react';
// @mui

import { Box, Button, Grid, Container, Typography } from '@mui/material';
// sections
import { useNavigate } from 'react-router-dom';

import { InformationCard } from '../sections/@dashboard/app';
import { fetchDataFromBackend } from '../_mock/fetchDataFromBackend';
import { ReviewCard } from '../sections/@dashboard/app/ReviewCard';
// ----------------------------------------------------------------------

// const review =
//   'The user interface is intuitive and easy to navigate. I had a great user experience.The user interface is intuitive and easy to navigate. I had a great user experience.';

export default function DashboardAppPage() {
  const [gradingCount, setGradingCount] = useState(0);
  const [thinkchatCount, setThinkchatCount] = useState(0);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const [review, setReview] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchReview() {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/api/show-review', {
          method: 'GET',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          //console.log(data);
          setReview(data.data[0].reviews); // Update the review state with the fetched review
        } else {
          console.error('Failed to fetch review.');
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    }
    fetchReview();
  }, []);

  const host = 'http://localhost:8000/api/get-users/:id';

  const handleUpdateValues = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/${date.startDate}/${date.endDate}`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    const data = json.data;
    console.log(data);
    setGradingCount(data.totalGradingCount);
    setThinkchatCount(data.totalthinkchatCount);
    setSatisfactionScore(data.toatalsatisfactionScore);
  };

  const onChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  useEffect(
    () => {
      if (localStorage.getItem('token')) {
        const fetchData = async () => {
          try {
            const data = await fetchDataFromBackend();

            setGradingCount(data.gradingCountDaily.grading_count_daily);
            setThinkchatCount(data.thinkchatCountDaily.tickets_solved);
            setSatisfactionScore(data.satisfactionScoreDaily.satisfaction_score);

            //fetchReview();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      } else {
        navigate('/');
      }
    },

    // Function to fetch data from the backend
    []
  );

  return (
    <>
      <Container maxWidth="xl">
        <Grid container sx={{ display: 'inline-flex' }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <form onSubmit={handleUpdateValues}>
            <Box sx={{ display: 'inline-flex', gap: 2, mt: 2, mb: 2 }}>
              <input type="date" value={date.startDate} name="startDate" onChange={onChange} />

              <input type="date" value={date.endDate} name="endDate" onChange={onChange} />
              <Button variant="contained" color="secondary" type="submit">
                Apply
              </Button>
            </Box>
          </form>
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

          <Grid item xs={12} md={10} lg={12}>
            <ReviewCard review={review} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
