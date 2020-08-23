/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/display-name */
import React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';

const Button: React.FC<MUIButtonProps> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default Button;
