import React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';

const Button: React.FC<MUIButtonProps> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default Button;
