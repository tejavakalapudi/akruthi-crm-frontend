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

// import leadsService from '../services/leadsService';
import Chip from '@material-ui/core/Chip';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
import { LeadsActions } from '../redux/actions';
import { ReactHelmet } from '../components';
import PopOver from '../components/PopOver';
// const leads = [
//   {
//     id: 1234,
//     name: 'Ravi',
//     contact: '9703000639',
//     venture: 'Gayatri',
//     flat_no: '312',
//     status: 'new',
//     employee_assigned: 'Vishnu',
//     pre_sale: false,
//     post_sale: true,
//     followup_required: true,
//     notes: [
//       {
//         message: 'Requested Call',
//         edit_by: 'Teja',
//         created_on: '2020-08-18T07:02:09.824+00:00',
//       },
//     ],
//     createdAt: '2020-08-18T07:02:09.824+00:00',
//     updatedAt: '2020-08-18T07:02:09.824+00:00',
//   },
//   {
//     id: 3245,
//     name: 'Mounika',
//     contact: '9703000639',
//     venture: 'Gayatri',
//     flat_no: '314',
//     status: 'new',
//     employee_assigned: 'Vishnu',
//     pre_sale: false,
//     post_sale: true,
//     followup_required: true,
//     notes: [
//       {
//         message: 'Requested Call',
//         edit_by: 'Teja',
//         created_on: '2020-08-18T07:02:09.824+00:00',
//       },
//     ],
//     createdAt: '2020-08-20T07:02:09.824+00:00',
//     updatedAt: '2020-08-24T07:02:09.824+00:00',
//   },
//   {
//     id: 4763,
//     name: 'Anu',
//     contact: '9703000639',
//     venture: 'Gayatri',
//     flat_no: '313',
//     status: 'new',
//     employee_assigned: 'Kiran',
//     pre_sale: true,
//     post_sale: false,
//     followup_required: false,
//     notes: [
//       {
//         message: 'Requested Call',
//         edit_by: 'Teja',
//         created_on: '2020-08-18T07:02:09.824+00:00',
//       },
//     ],
//     createdAt: '2020-08-17T07:02:09.824+00:00',
//     updatedAt: '2020-08-19T07:02:09.824+00:00',
//   },
// ];
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
    // maxWidth: 1000,
    // color: '#e1bee7',
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
  const statusList = useSelector((state) =>
    state.leads.map((item) => {
      return item.status;
    })
  );
  useEffect(() => {
    dispatch(LeadsActions.getAllLeads());
  }, []);
  const itemIds = userData.map((item) => item.id);
  console.log(itemIds);

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

  const capitalizeStatus = (status) => {
    const arr = status.split(/\s|_/);
    for (let i = 0, l = arr.length; i < l; i++) {
      arr[i] =
        arr[i].substr(0, 1).toUpperCase() +
        (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : ' ') +
        (arr[i].substr(1).length > 1 ? ' ' : ' ');
    }
    return arr;
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
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
                  label={capitalizeStatus(row.status)}
                  classes={{ root: 'chip' }}
                  className={row.status}
                  onClick={handleClick}
                  SelectProps={{
                    native: true,
                  }}
                />

                <PopOver
                  capitalizeStatus={capitalizeStatus}
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
// https://dribbble.com/shots/6773387-Sales-orders-list?utm_source=Clipboard_Shot&utm_campaign=antonyefimenko&utm_content=Sales%20orders%20list&utm_medium=Social_Share
// https://dribbble.com/shots/5465599-Order-Management?utm_source=Clipboard_Shot&utm_campaign=tsibulski&utm_content=Order%20Management&utm_medium=Social_Share
// https://dribbble.com/shots/7227376-Accounts-List-View?utm_source=Clipboard_Shot&utm_campaign=Ashmita&utm_content=Accounts%20List%20View&utm_medium=Social_Share

// write services for leads
// get all leads in useEffect of Leads.js
// Connect redux and dispatch leads to redux store from component
// read redux leads in component using useSelector and use them to render table
