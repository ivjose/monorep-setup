import React from 'react';

import OutlinedInput, {
  OutlinedInputProps,
} from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import { useStyles } from './styles';
import { Props } from './interface';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Props &
  Omit<OutlinedInputProps, 'input'>;

// const Input: React.FC<Props> = ({
//   register,
//   value,
//   name,
//   label,
//   error = null,
//   ...props
// }) => {
//   const classes = useStyles();

//   return (
//     <FormControl fullWidth className={classes.margin} error={!!error}>
//       {label && <InputLabel htmlFor={name}>Name</InputLabel>}
//       <FilledInput
//         {...props}
//         inputRef={register}
//         name={name}
//         value={value}
//         id={name}
//         aria-describedby={name}
//       />
//       {error && <FormHelperText>{error}</FormHelperText>}
//     </FormControl>
//   );
// };

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, name, error, errorText, label, required, helperText, ...props },
    ref
  ) => {
    const classes = useStyles();
    return (
      <FormControl
        fullWidth
        variant="outlined"
        className={classes.margin}
        error={!!error}
      >
        <InputLabel htmlFor={name} required={required}>
          {label}
        </InputLabel>

        <OutlinedInput
          required={required}
          inputRef={ref}
          name={name}
          value={value}
          id={name}
          aria-describedby={name}
          label={label && `${label}   .`}
          {...props}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorText && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default Input;
