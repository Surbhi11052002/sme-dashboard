import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ user_id }) {
  const [open, setOpen] = React.useState(false);
  const [textInput, setTextInput] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTextInputChange = (event) => setTextInput(event.target.value);

  // const handleSubmit = () => {
  //   console.log('Submitted Text:', textInput);

  //   handleClose();
  // };
  const handleSubmit = async () => {
    try {
      console.log('Submitted Text:', textInput);
      const response = await fetch(`http://localhost:8000/api/add-review/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({ review: textInput }), // Convert the review object to JSON
      });

      if (response.ok) {
        console.log('Review submitted successfully!');
      } else {
        console.error('Failed to submit review.');
      }

      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="error">
        Review
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            REVIEW
          </Typography>
          <TextField
            label="Enter Review"
            variant="outlined"
            fullWidth
            multiline
            maxRows={6}
            value={textInput}
            onChange={handleTextInputChange}
            sx={{ mt: 2, maxHeight: '150px' }}
          />
          <Button onClick={handleSubmit} sx={{ mt: 2 }} variant="contained">
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
