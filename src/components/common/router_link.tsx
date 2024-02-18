import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const RouterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function RouterLink(itemProps, ref) {
  return <Link ref={ref} {...itemProps} role={undefined} />;
});
