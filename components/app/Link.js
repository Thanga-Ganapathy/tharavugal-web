import { Link as MUILink } from '@mui/material';
import NextLink from 'next/link';

export default function Link({ href, children, ...otherProps }) {
  return (
    <MUILink component={NextLink} href={href} {...otherProps}>
      {children}
    </MUILink>
  );
}
