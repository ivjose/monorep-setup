import React from 'react';

import { InputBaseProps } from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import { useStyles, DefaultInputText } from './styles';
import { Props } from './interface';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Props &
  Omit<InputBaseProps, 'input'>;

// eslint-disable-next-line react/display-name
const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, name, error, errorText, label, required, helperText, ...props },
    ref
  ) => {
    const classes = useStyles();
    return (
      <FormControl fullWidth className={classes.margin} error={!!error}>
        <InputLabel shrink htmlFor={name} required={required}>
          {label}
        </InputLabel>
        <DefaultInputText
          required={required}
          inputRef={ref}
          name={name}
          value={value}
          id={name}
          {...props}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorText && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default InputText;
