import React from 'react';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const popOver = (props) => {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  const id = props.open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      anchorReference="anchorEl"
    >
      {props.statusList.map((row) => {
        return (
          <Typography>
            <Chip
              label={row}
              // classes={{ root: 'chip' }}
              className={row}
              // onClick={handleClick}
            />
          </Typography>
        );
      })}
    </Popover>
  );
};
export default popOver;
