import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
