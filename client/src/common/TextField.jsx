import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({
    label,
    input,
    step,
    meta: { touched, invalid, error },
    ...custom,
    
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )