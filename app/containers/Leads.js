import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
import { grey, red } from '@material-ui/core/colors';
import { ReactHelmet } from '../components';

const leads = [
  {
    id: 1234,
    name: 'Ravi',
    contact: '9703000639',
    venture: 'Gayatri',
    flat_no: '312',
    status: 'new',
    employee_assigned: 'Vishnu',
    pre_sale: false,
    post_sale: true,
    followup_required: true,
    notes: [
      {
        message: 'Requested Call',
        edit_by: 'Teja',
        created_on: '2020-08-18T07:02:09.824+00:00',
      },
    ],
    createdAt: '2020-08-18T07:02:09.824+00:00',
    updatedAt: '2020-08-18T07:02:09.824+00:00',
  },
  {
    id: 3245,
    name: 'Mounika',
    contact: '9703000639',
    venture: 'Gayatri',
    flat_no: '314',
    status: 'new',
    employee_assigned: 'Vishnu',
    pre_sale: false,
    post_sale: true,
    followup_required: true,
    notes: [
      {
        message: 'Requested Call',
        edit_by: 'Teja',
        created_on: '2020-08-18T07:02:09.824+00:00',
      },
    ],
    createdAt: '2020-08-20T07:02:09.824+00:00',
    updatedAt: '2020-08-24T07:02:09.824+00:00',
  },
  {
    id: 4763,
    name: 'Anu',
    contact: '9703000639',
    venture: 'Gayatri',
    flat_no: '313',
    status: 'new',
    employee_assigned: 'Kiran',
    pre_sale: true,
    post_sale: false,
    followup_required: false,
    notes: [
      {
        message: 'Requested Call',
        edit_by: 'Teja',
        created_on: '2020-08-18T07:02:09.824+00:00',
      },
    ],
    createdAt: '2020-08-17T07:02:09.824+00:00',
    updatedAt: '2020-08-19T07:02:09.824+00:00',
  },
];
const useStyles = makeStyles({
  paper: {
    marginLeft: 77,
  },
  table: {
    minWidth: 1100,
  },
  header: {
    backgroundColor: '#e1bee7',
    // color: rgba(0, 0, 0, 0.54),
  },
});
function Leads() {
  const classes = useStyles();
  const [checkedItems, setChecked] = useState([]);
  const itemIds = leads.map((item) => item.id);

  useEffect(() => {
    // await leadsService.getAllLeads();
  },[])

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
  return (
    // <div>
    <Paper className={classes.paper}>
      {/* <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      > */}
      <ReactHelmet title="Dashboard" meta="Discover your leads" />
      {/* <TextField
        // style={{ padding: 10 }}
        label="Filter sales orders"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment style={{ padding: '10px' }}>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />{' '} */}
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell component="th">
              <Checkbox
                color="primary"
                size="small"
                onClick={handleToggle}
                checked={checkedItems.length === itemIds.length}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Venture</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Employee Assigned</TableCell>
            <TableCell>FollowUp Required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((row) => (
            <TableRow key={row.name}>
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
              <TableCell component="th">{row.name}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{`${row.venture}, ${row.flat_no}`}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.employee_assigned}</TableCell>
              <TableCell>{`${row.followup_required}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </Tabs> */}
    </Paper>
    // </div>
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