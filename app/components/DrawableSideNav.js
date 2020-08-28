import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useLocation } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { DashboardOutlined, ApartmentOutlined, TimelineOutlined } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';
import LogoIcon from '../assets/akruthi-logo.png';

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: `${theme.palette.primary.main}6e !important`,
  },
  ripple: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const DrawableSideNav = () => {
  const [showList, toggleDisplay] = useState(false);
  const classes = useStyles();

  const currentPath = useLocation().pathname.split('/')[1];

  const toggleDrawer = () => {
    toggleDisplay(!showList);
  };

  const ListItemWithTransition = ({ title, logo }) => (
    <CSSTransition in={showList} timeout={200} classNames="listItem" appear unmountOnExit>
      <div>
        <ListItemText primary={title} classes={{ root: `text ${showList ? 'open' : ''} ${logo ? '_logo' : ''}` }} />
      </div>
    </CSSTransition>
  );

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
      <ListItemWithTransition title={title} />
    </ListItem>
  );

  return (
    <div>
      <Drawer
        variant="permanent"
        classes={{ paper: 'drawer-wrapper' }}
        onMouseEnter={toggleDrawer}
        onMouseLeave={toggleDrawer}
      >
        <List classes={{ root: 'drawer-list' }}>
          <ListItem button classes={{ root: 'item _logo' }} disableRipple disableTouchRipple>
            <ListItemIcon classes={{ root: 'icon' }}>
              <img alt="akruthi-crm" src={LogoIcon} />
            </ListItemIcon>
            <ListItemWithTransition title="akruthi CRM" logo />
          </ListItem>

          <Divider style={{ flexGrow: 1 }} />

          <ListItemWithCustomRipple
            title="dashboard"
            component={<DashboardOutlined color="inherit" />}
            selected={currentPath === 'dashboard' || currentPath === ''}
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
      </Drawer>
    </div>
  );
};

export default DrawableSideNav;
