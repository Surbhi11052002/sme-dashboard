import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  let history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    role: '',
    discipline: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // mode: 'no-cors',
      body: JSON.stringify(formData),
    });
    const json = await response.json();
    if (json.success) {
      //localStorage.setItem('token', json.token);
      history('/');
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Stack spacing={3} direction="column">
        <TextField name="username" label="Username" value={formData.username} onChange={handleChange} />
        <TextField name="role" select label="Role" value={formData.role} onChange={handleChange}>
          <MenuItem value="contentlead">Content Lead</MenuItem>
          <MenuItem value="sme">Subject Matter Expert</MenuItem>
        </TextField>
        <TextField name="discipline" select label="Discipline" value={formData.discipline} onChange={handleChange}>
          <MenuItem value="design">Design</MenuItem>
          <MenuItem value="engineering">Engineering</MenuItem>
        </TextField>
        <TextField name="email" label="Email" value={formData.email} onChange={handleChange} />
        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
          Sign Up
        </LoadingButton>
      </Stack>
    </>
  );
};

export default RegisterForm;
