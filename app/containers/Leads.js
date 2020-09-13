/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { LeadsActions } from '../redux/actions';
import { ReactHelmet } from '../components';
import PopOver from '../components/PopOver';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginLeft: 77,
  },
  table: {
    minWidth: 1100,
  },
  header: {},
  headerCell: {
    textTransform: 'capitalize',
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

function Leads() {
  const classes = useStyles();
  const [checkedItems, setChecked] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.leads);
  const statusList = userData.map((item) => item.status);
  const itemIds = userData.map((item) => item.id);

  useEffect(() => {
    dispatch(LeadsActions.getAllLeads());
  }, []);

  const handleToggle = () => {
    if (checkedItems.length === itemIds.length) {
      setChecked([]);
    } else {
      setChecked(itemIds);
    }
  };

  const handleRowCheck = (id) => {
    if (checkedItems.includes(id)) {
      setChecked(checkedItems.filter((item) => item !== id));
    } else {
      setChecked([...checkedItems, id]);
    }
  };

  const formatStatusField = (status) => status.split('_').join(' ');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Paper className={classes.paper}>
      <ReactHelmet title="Dashboard" meta="Discover your leads" />

      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell component="th" className={classes.headerCell}>
              <Checkbox
                color="primary"
                size="small"
                onClick={handleToggle}
                checked={checkedItems.length === itemIds.length}
              />
            </TableCell>
            <TableCell color="primary" className={classes.headerCell}>
              Name
            </TableCell>
            <TableCell className={classes.headerCell}>Contact</TableCell>
            <TableCell className={classes.headerCell}>Venture</TableCell>
            <TableCell className={classes.headerCell}>Status</TableCell>
            <TableCell className={classes.headerCell}>Employee Assigned</TableCell>
            <TableCell className={classes.headerCell}>FollowUp Required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Checkbox
                  key={row.id}
                  checked={checkedItems.includes(row.id)}
                  color="primary"
                  size="small"
                  onClick={() => {
                    handleRowCheck(row.id);
                  }}
                />
              </TableCell>
              <TableCell component="th">{row.customer_name}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{`${row.venture.name}, ${row.flat_No}`}</TableCell>
              <TableCell>
                <Chip
                  label={formatStatusField(row.status)}
                  classes={{ root: 'chip' }}
                  className={row.status}
                  onClick={handleClick}
                  SelectProps={{
                    native: true,
                  }}
                />

                <PopOver
                  formatStatusField={formatStatusField}
                  statusList={statusList}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                />
              </TableCell>
              <TableCell>{row.employee_assigned.name}</TableCell>
              <TableCell>{`${row.followup_required}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
export default Leads;
