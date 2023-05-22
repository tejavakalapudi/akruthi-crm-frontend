/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Paper, Checkbox, TableRow, TableHead, TableCell, TableBody, Table, Button } from '@mui/material';
import {Pagination} from '@mui/material';

import { LeadsActions } from '../../redux/actions';
import { ReactHelmet, TableToolBar } from '../../components';
import LeadForm from './LeadForm';
import ExpandableRow from './ExpandableRow';

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
    fontWeight: 'bold',
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
  const [activeLead, setActiveLead] = useState(initialLead);
  const [isModalOpen, toggleModal] = useState(false);
  const [isNotesEnabled, toggleNotes] = useState(false);
  const { data: leadsData, pagination } = useSelector((state) => state.leads);
  const currentAuth = useSelector((state) => state.auth);

  const statuses = useSelector((state) => state.statuses);
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

  const onEditLead = (lead, showNotes) => {
    toggleModal(true);
    if(showNotes){
      toggleNotes(true);
    }
    setActiveLead(lead);
  };

  const handleModalToggle = () => {
    toggleModal(!isModalOpen);
    toggleNotes(false);
    setActiveLead(initialLead);
  };

  // https://github.com/gregnb/mui-datatables
  // For filter design

  // 
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
        <div style={{minHeight: 500, marginBottom: 20}}>
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
                <TableCell className={classes.headerCell}>Phone</TableCell>
                <TableCell className={classes.headerCell}>Email</TableCell>
                <TableCell className={classes.headerCell}>Venture</TableCell>
                <TableCell className={classes.headerCell}>Flat No</TableCell>
                <TableCell className={classes.headerCell}>Assigned to</TableCell>
                <TableCell className={classes.headerCell}>Status</TableCell>
                <TableCell className={classes.headerCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {leadsData.length && leadsData.map((lead) => (
                <ExpandableRow 
                  onEdit={onEditLead}
                  lead={lead}
                  checkedItems={checkedItems} 
                  handleRowCheck= {handleRowCheck} 
                  statuses={statuses}
                  key={lead._id}
                />
              ))}
            </TableBody>
          </Table>
        </div>
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
          isNotesEnabled={isNotesEnabled}
          currentUser={currentAuth.user.displayName}
        />
      )}
    </div>
  );
}
export default Leads;
