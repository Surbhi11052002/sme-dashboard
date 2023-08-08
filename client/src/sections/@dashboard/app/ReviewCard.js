import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';

export const ReviewCard = ({ review }) => {
  //   const { review } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3,
          }}
        ></Box>
        <Typography align="center" gutterBottom variant="h5">
          Review
        </Typography>
        <Typography align="center" variant="body1">
          {review}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
    </Card>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};
