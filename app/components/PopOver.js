import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(1),
  },
}));
const popOver = (props) => {
  const id = props.open ? 'simple-popover' : undefined;
  const classes = useStyles();
  return (
    <Popover
      id={id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
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
      {props.statusList.map((row) => {
        return (
          <>
            <Typography className={classes.typography}>
              <FiberManualRecordOutlinedIcon className={row} classes={{ root: 'statusList' }} fontSize="small" />
              {props.capitalizeStatus(row)}
            </Typography>
          </>
        );
      })}
    </Popover>
  );
};
export default popOver;
