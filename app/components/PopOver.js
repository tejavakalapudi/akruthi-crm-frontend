/* eslint-disable react/no-array-index-key */
import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { makeStyles } from '@mui/styles';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { capitalize } from 'lodash';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    alignItems: 'center',
    display: 'flex',
    textTransform: 'capitalize',
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.default,
    },
  },
  activeStatus: {
    backgroundColor: theme.palette.background.default,
  },
}));

const PopOver = ({ anchorEl, onClose, statusList, formatStatusField, activeStatus, selectStatus }) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const classes = useStyles();
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      boxshadow={0}
      anchorReference="anchorEl"
    >
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {statusList.map((row, index) => (
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton onClick={ () => {selectStatus(row)}} dense>
              <ListItemIcon style={{minWidth: 32}}>
                <FiberManualRecord
                  style={{ fontSize: '14px' }}
                  className={row}
                  classes={{ root: 'statusList' }}
                  fontSize="small"
                />
              </ListItemIcon>
              <ListItemText style={{ textTransform: 'capitalize', fontWeight: 'bold' }} primary={formatStatusField(row)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};
export default PopOver;