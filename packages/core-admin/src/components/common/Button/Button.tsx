/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/display-name */
import React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { useTableStyles } from './styles';

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  NextLinkProps;

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const classes = useTableStyles();

    const {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a className={classes.link} ref={ref} {...other} />
      </NextLink>
    );
  }
);

const Button: React.FC<MUIButtonProps> = ({ children, href, ...rest }) => {
  return (
    <>
      {href ? (
        <NextComposed href={href}>
          <MuiButton {...rest}>{children}</MuiButton>
        </NextComposed>
      ) : (
        <MuiButton {...rest}>{children}</MuiButton>
      )}
    </>
  );
};

export default Button;
