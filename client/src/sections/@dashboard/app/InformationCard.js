// @mui
import PropTypes from 'prop-types';
// import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils

// components

// ----------------------------------------------------------------------

InformationCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  text: PropTypes.string,
  sx: PropTypes.object,
};

export default function InformationCard({ title, total, color, text, sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h3">
        {total} {text}
      </Typography>

      <Typography variant="h5" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
