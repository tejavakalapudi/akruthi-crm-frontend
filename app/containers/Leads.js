/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { LeadsActions } from '../redux/actions';
import { ReactHelmet } from '../components';
import PopOver from '../components/PopOver';
import leadsService from '../services/leadsService';

const useStyles = makeStyles((theme) => ({
  header: {},
  headerCell: {
    textTransform: 'capitalize',
  },
  typography: {
    padding: theme.spacing(2),
  },
  pagination: {
    float: 'right',
  },
}));

function Leads() {
  const classes = useStyles();
  const [checkedItems, setChecked] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  // object destructuring
  const { data: leadsData, pagination } = useSelector((state) => state.leads);
  const [page, setPage] = React.useState(1);
  const handlePageCountChange = (event, value) => {
    setPage(value);
    // alert(value);
  };
  // alert(pagination);
  const [limit, setLimit] = React.useState(10);
  const [result, setResult] = React.useState([]);
  const totalPages = Math.ceil(pagination.totalItems / limit);
  // debugger;
  console.log('-----', pagination.totalItems);

  const statuses = useSelector((state) => state.statuses);
  const statusList = statuses.map((status) => status.name);
  const itemIds = leadsData.map((item) => item._id);

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

  const formatStatusField = (status) => status && status.split('_').join(' ');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBulkUpload = (e) => {
    if (!e.target.files.length) {
      console.log('no files');
    } else {
      dispatch(LeadsActions.bulkUploadLeads(e.target.files[0]));
    }
  };
  // useEffect(() => {
  leadsService.getAllLeads(limit, page).then((response) => {
    console.log(response.data);
    // debugger;
    // return response;
    setResult(response.data.data);
  });
  // }, []);

  return (
    <div>
      <ReactHelmet title="Dashboard" meta="Discover your leads" />
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
        <input
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleBulkUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Bulk Upload
          </Button>
        </label>
      </div>
      <Paper>
        <Table size="small">
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
              <TableCell className={classes.headerCell}>Assigned to</TableCell>
              <TableCell className={classes.headerCell}>Follow up</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {leadsData.map((row, index) => ( */}
            {result.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Checkbox
                    key={row._id}
                    checked={checkedItems.includes(row._id)}
                    color="primary"
                    size="small"
                    onClick={() => {
                      handleRowCheck(row._id);
                    }}
                  />
                </TableCell>
                <TableCell component="th">{row.customer_name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.venture ? `${row.venture.name}, ${row.flat_No}` : ''}</TableCell>
                <TableCell>
                  <Chip
                    label={formatStatusField(row.status)}
                    classes={{ root: 'chip' }}
                    className={row.status}
                    onClick={handleClick}
                    selectprops={{
                      native: true,
                    }}
                  />
                </TableCell>
                <TableCell>{row.employee_assigned ? row.employee_assigned.name : ''}</TableCell>
                <TableCell>{row.followup_required ? `${row.followup_required}` : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <PopOver
            formatStatusField={formatStatusField}
            statusList={statusList}
            anchorEl={anchorEl}
            onClose={handleClose}
          />
          <Pagination
            count={totalPages}
            variant="outlined"
            page={page}
            onChange={handlePageCountChange}
            color="primary"
            className={classes.pagination}
          />
        </Table>
      </Paper>
    </div>
  );
}
export default Leads;
