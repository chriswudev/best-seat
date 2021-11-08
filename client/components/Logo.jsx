import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import logoImg from '../assets/images/logo.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box component="img" src={logoImg} sx={{ width: 40, height: 40, ...sx }} />
  );
}
