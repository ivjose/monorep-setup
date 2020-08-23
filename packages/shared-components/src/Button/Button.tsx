/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/display-name */
import React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { useTableStyles } from './styles';

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>;

const Button: React.FC<MUIButtonProps> = ({ children, ...rest }) => {
  return (
    <>
      <MuiButton {...rest}>{children}</MuiButton>
    </>
  );
};

export default Button;
