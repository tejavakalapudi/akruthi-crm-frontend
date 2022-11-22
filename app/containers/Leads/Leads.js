/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Paper, Checkbox, TableRow, TableHead, TableCell, TableBody, Table, Button, Chip } from '@mui/material';
import {Pagination} from '@mui/material';

import { LeadsActions } from '../../redux/actions';
import { ReactHelmet, PopOver, TableToolBar } from '../../components';
import LeadForm from './LeadForm';

const initialLead = {
  customer_name: '',
  contact: '',
  email: '',
  venture: '',
  flat_no: '',
  employee_assigned: '',
  followup_required: false,
  visit_scheduled: false,
  notes: [],
  status: 'lead_generated',
};

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [activeLead, setActiveLead] = useState(initialLead);
  const [isModalOpen, toggleModal] = useState(false);
  const { data: leadsData, pagination } = useSelector((state) => state.leads);

  const statuses = useSelector((state) => state.statuses);
  const statusList = statuses.map((status) => status.name);
  const itemIds = leadsData.map((item) => item._id);

  const dispatch = useDispatch();

  const handlePageCountChange = (event, value) => {
    dispatch(LeadsActions.getAllLeads(value));
  };

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

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(id);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setActiveRow(null);
  };

  const handleDelete = () => {
    dispatch(LeadsActions.deleteLeads(checkedItems));
  };

  const handleBulkUpload = (e) => {
    if (!e.target.files.length) {
      console.log('no files');
    } else {
      dispatch(LeadsActions.bulkUploadLeads(e.target.files[0]));
    }
  };

  const onLeadClick = (lead) => {
    toggleModal(true);
    setActiveLead(lead);
  };

  const handleModalToggle = () => {
    toggleModal(!isModalOpen);
    setActiveLead(initialLead);
  };

  // https://github.com/gregnb/mui-datatables
  // For filter design

  return (
    <div>
      <ReactHelmet title="Dashboard" meta="Discover your leads" />
      <div className="buttons-container">
        <label>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className="create__new"
            onClick={handleModalToggle}
          >
            Create New
          </Button>
        </label>

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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolBar tableHeading="Leads" numSelected={checkedItems.length} onDeleteClick={handleDelete} />
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
            {leadsData.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  onLeadClick(row);
                }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    key={row._id}
                    checked={checkedItems.includes(row._id)}
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowCheck(row._id);
                    }}
                  />
                </TableCell>
                <TableCell component="th">{row.customer_name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.venture ? `${row.venture.name}, ${row.flat_no}` : ''}</TableCell>
                <TableCell>
                  <Chip
                    label={formatStatusField(row.status)}
                    classes={{ root: 'chip' }}
                    className={row.status}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClick(event, row._id);
                    }}
                    selectprops={{
                      native: true,
                    }}
                  />
                </TableCell>
                <TableCell>{row.employee_assigned ? row.employee_assigned.name : ''}</TableCell>
                <TableCell>{row.followup_required ? `${row.followup_required}` : ''}</TableCell>
                {activeRow === row._id && (
                  <PopOver
                    formatStatusField={formatStatusField}
                    statusList={statusList}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    activeStatus={row.status}
                  />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={pagination.total}
          variant="outlined"
          onChange={handlePageCountChange}
          color="primary"
          className={classes.pagination}
        />
      </Paper>
      {isModalOpen && (
        <LeadForm
          open={isModalOpen}
          toggleModal={handleModalToggle}
          isEdit={activeLead.customer_name !== ''}
          activeLead={activeLead}
        />
      )}
    </div>
  );
}
export default Leads;
