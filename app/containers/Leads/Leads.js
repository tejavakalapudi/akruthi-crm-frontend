/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Checkbox, TableRow, TableHead, TableCell, TableBody, Table, Button, Chip } from '@material-ui/core/';

import { LeadsActions } from '../../redux/actions';
import { ReactHelmet, PopOver } from '../../components';
import CreateLead from './CreateLead';

const useStyles = makeStyles((theme) => ({
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, toggleModal] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.leads);
  const statuses = useSelector((state) => state.statuses);
  const statusList = statuses.map((status) => status.name);
  const itemIds = userData.map((item) => item._id);

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

  const handleModalToggle = () => {
    toggleModal(!isModalOpen);
  };

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
            {userData.map((row, index) => (
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
        </Table>
      </Paper>
      <CreateLead open={isModalOpen} toggleModal={handleModalToggle} />
    </div>
  );
}
export default Leads;
