import React from 'react';
import { Typography } from "@material-ui/core";
import LogoIcon from '../assets/akruthi-logo.png';

const Logo = () => {
    return (
        <div className='logo'>
            <img alt="akruthi-crm" src={LogoIcon} className='logo__icon'/>
            <Typography classes={{root: 'logo__text'}}>akruthi CRM</Typography>
        </div>
    );
};

export default Logo;