/* eslint-disable react/no-array-index-key */
import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

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

const PopOver = ({ anchorEl, onClose, statusList, formatStatusField, activeStatus }) => {
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
      {statusList.map((row, index) => (
        <div key={`status-${index}`}>
          <Typography className={`${classes.typography} ${activeStatus === row ? classes.activeStatus : ''}`}>
            <FiberManualRecord
              style={{ fontSize: '14px', marginRight: '10px' }}
              className={row}
              classes={{ root: 'statusList' }}
              fontSize="small"
            />
            {formatStatusField(row)}
          </Typography>
        </div>
      ))}
    </Popover>
  );
};
export default PopOver;
