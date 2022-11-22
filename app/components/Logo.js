import React from 'react';
import { Typography } from '@mui/material';
import LogoIcon from '../assets/akruthi-logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <img alt="akruthi-crm" src={LogoIcon} className="logo__icon" />
      <Typography classes={{ root: 'logo__text' }}>akruthi CRM</Typography>
    </div>
  );
};

export default Logo;
