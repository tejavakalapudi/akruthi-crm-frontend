/* eslint-disable react/no-array-index-key */
import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
    alignItems: 'center',
    display: 'flex',
    textTransform: 'capitalize',
  },
}));
const PopOver = ({ open, anchorEl, onClose, statusList, formatStatusField }) => {
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
      boxShadow={0}
      anchorReference="anchorEl"
    >
      {statusList.map((row, index) => (
        <div key={`status-${index}`}>
          <Typography className={classes.typography}>
            <FiberManualRecordOutlinedIcon
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
