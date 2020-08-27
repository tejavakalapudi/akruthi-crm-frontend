import React, {useState} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { DashboardOutlined, ApartmentOutlined, TimelineOutlined } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';


const DrawableSideNav = () => {
    const [showList, toggleDisplay] = useState(false);

    const toggleDrawer = () => {
        toggleDisplay(!showList);
    };


    const ListItemWithTransition = ({ title }) => (
        <CSSTransition in={showList} timeout={200} classNames='listItem' appear unmountOnExit>
            <div>
                <ListItemText primary={title} classes={{ root: `text ${showList ? 'open' : ''}` }} />
            </div>
        </CSSTransition>
    );

    return (
        <div>
            <Drawer
                variant="permanent"
                classes={{ paper: 'drawer-wrapper' }}
                onMouseEnter={toggleDrawer}
                onMouseLeave={toggleDrawer}
            >
                <List classes={{root: 'drawer-list'}}>
                    <ListItem button classes={{root: 'item'}}>
                        <ListItemIcon classes={{ root: 'icon' }}><DashboardOutlined color='inherit'/></ListItemIcon>
                        <ListItemWithTransition title="Dashboard" />
                    </ListItem>
                    <ListItem button classes={{root: 'item'}}>
                        <ListItemIcon classes={{ root: 'icon' }}><ApartmentOutlined color='inherit'/></ListItemIcon>
                        <ListItemWithTransition title="Ventures" />
                    </ListItem>
                    <ListItem button classes={{root: 'item'}}>
                        <ListItemIcon classes={{ root: 'icon' }}><TimelineOutlined color='inherit'/></ListItemIcon>
                         <ListItemWithTransition title="Analytics" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default DrawableSideNav;