import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';

export default ({ input, children, ...rest }) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        {children}
      </RadioGroup>
    </FormControl>
);