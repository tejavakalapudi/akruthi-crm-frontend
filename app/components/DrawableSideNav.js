/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Popover } from '@material-ui/core';
import { DashboardOutlined, ApartmentOutlined, TimelineOutlined, DnsOutlined, ChevronRight } from '@material-ui/icons';

import Settings from './Settings';
import LogoIcon from '../assets/akruthi-logo.png';

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: `${theme.palette.primary.main}6e !important`,
  },
  ripple: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const DrawableSideNav = ({ currentTheme, toggleTheme }) => {
  const currentAuth = useSelector((state) => state.auth);
  const [showList, toggleDisplay] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const currentPath = useLocation().pathname.split('/')[1];

  const toggleDrawer = () => {
    toggleDisplay(!showList);
  };

  const handleClick = (event) => {
    event.persist();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ListItemWithCustomRipple = ({ component, title, selected }) => (
    <ListItem
      button
      classes={{
        root: 'item',
        selected: classes.selected,
      }}
      TouchRippleProps={{
        classes: { child: classes.ripple },
      }}
      selected={selected}
      component={NavLink}
      to={`/${title}`}
    >
      <ListItemIcon classes={{ root: 'icon' }}>{component}</ListItemIcon>
      {showList && <ListItemText primary={title} classes={{ root: `text ` }} />}
    </ListItem>
  );

  return (
    <div>
      {currentAuth.isAuthorized && (
        <ChevronRight color="secondary" className={`chevron ${showList ? 'open' : 'close'}`} onClick={toggleDrawer} />
      )}
      {currentAuth.isAuthorized && (
        <Drawer variant="permanent" classes={{ paper: 'drawer-wrapper' }}>
          <List classes={{ root: 'drawer-list' }}>
            <ListItem
              button
              classes={{ root: 'item _logo' }}
              disableRipple
              disableTouchRipple
              component={NavLink}
              to="/"
            >
              <ListItemIcon classes={{ root: 'icon' }}>
                <img alt="akruthi-crm" src={LogoIcon} />
              </ListItemIcon>

              {showList && <ListItemText primary="akruthi CRM" classes={{ root: `text _logo` }} />}
            </ListItem>

            <Divider style={{ flexGrow: 1 }} />

            <ListItemWithCustomRipple
              title="dashboard"
              component={<DashboardOutlined color="inherit" />}
              selected={currentPath === 'dashboard' || currentPath === ''}
            />
            <ListItemWithCustomRipple
              title="leads"
              component={<DnsOutlined color="inherit" />}
              selected={currentPath === 'leads'}
            />
            <ListItemWithCustomRipple
              title="ventures"
              component={<ApartmentOutlined color="inherit" />}
              selected={currentPath === 'ventures'}
            />
            <ListItemWithCustomRipple
              title="analytics"
              component={<TimelineOutlined color="inherit" />}
              selected={currentPath === 'analytics'}
            />
          </List>

          <div className="profile-wrapper">
            <Avatar
              alt={currentAuth.user.displayName}
              src={currentAuth.user.photoURL}
              onClick={handleClick}
              className="avatar"
            />
            {showList && (
              <span onClick={handleClick} onKeyDown={handleClick} role="button">
                {currentAuth.user.displayName.split(' ')[0]}
              </span>
            )}
          </div>

          <Popover
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            boxshadow={0}
            anchorReference="anchorEl"
            onClose={handleClose}
          >
            <Settings currentTheme={currentTheme} toggleTheme={toggleTheme} />
          </Popover>
        </Drawer>
      )}
    </div>
  );
};

export default DrawableSideNav;
