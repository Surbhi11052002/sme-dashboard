import * as React from 'react';
//
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const demoContainerStyle = {
  width: '200px',
  height: '100px',
};
//
export default function BasicDatePicker(props) {
  const { labeltext } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={demoContainerStyle}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={labeltext} />
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}
