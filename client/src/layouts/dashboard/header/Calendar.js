import * as React from 'react';
//
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const demoContainerStyle = {
  width: '170px',
  height: '50px',
};
//
export default function BasicDatePicker(props) {
  const { labeltext } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={demoContainerStyle}>
        <DatePicker label={labeltext} />
      </div>
    </LocalizationProvider>
  );
}
