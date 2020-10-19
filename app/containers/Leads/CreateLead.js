import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core/';
import { Event } from '@material-ui/icons';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { LeadsActions } from '../../redux/actions';

export default ({ open, toggleModal }) => {
  const dispatch = useDispatch();
  const requiredFields = ['name', 'contact', 'venture'];
  const { ventures, employees } = useSelector((state) => state);

  const [isSchedulerOpen, enableScheduler] = useState(false);
  const [payload, setPayload] = useState({
    customer_name: '',
    contact: '',
    email: '',
    venture: '',
    flat_no: '',
    employee_assigned: '',
    followup_required: false,
    visit_scheduled: false,
    note: '',
    status: 'lead_generated',
  });

  const toggleScheduler = () => {
    enableScheduler(!isSchedulerOpen);
  };

  const onNameChange = (e) => {
    setPayload({
      ...payload,
      customer_name: e.target.value,
    });
  };

  const onEmailChange = (e) => {
    setPayload({
      ...payload,
      email: e.target.value,
    });
  };

  const onPhoneChange = (e) => {
    const phoneStr = e.target.value;
    if (phoneStr.match(/^(\s*|\d+)$/) && phoneStr.length <= 10) {
      setPayload({
        ...payload,
        contact: phoneStr,
      });
    }
  };

  const onVentureChange = (e) => {
    setPayload({
      ...payload,
      venture: e.target.value,
    });
  };

  const onFlatChange = (e) => {
    setPayload({
      ...payload,
      flat_no: e.target.value,
    });
  };

  const onEmployeeChange = (e) => {
    setPayload({
      ...payload,
      employee_assigned: e.target.value,
    });
  };

  const scheduleVisit = () => {
    setPayload({
      ...payload,
      visit_scheduled: !payload.visit_scheduled,
    });
  };

  const scheduleFollowUp = () => {
    setPayload({
      ...payload,
      followup_required: !payload.followup_required,
    });
  };

  const onNotesChange = (e) => {
    setPayload({
      ...payload,
      note: e.target.value,
    });
  };

  const isDisabled = () => {
    return requiredFields.some((value) => payload[value] === '');
  };

  const onFormSubmit = () => {
    dispatch(LeadsActions.createLead(payload)).then(() => {
      toggleModal();
    });
  };

  return (
    <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle id="form-dialog-title">Create a New Lead</DialogTitle>
      <Divider />

      <DialogContent>
        <form>
          <TextField
            value={payload.customer_name}
            label="Name"
            variant="outlined"
            required
            classes={{ root: 'lead-input' }}
            onChange={onNameChange}
          />
          <br />
          <TextField
            value={payload.contact}
            label="Phone"
            variant="outlined"
            required
            classes={{ root: 'lead-input' }}
            onChange={onPhoneChange}
          />
          <br />
          <TextField
            value={payload.email}
            label="Email"
            variant="outlined"
            classes={{ root: 'lead-input' }}
            onChange={onEmailChange}
          />
          <br />

          <FormControl variant="outlined" classes={{ root: 'lead-input venture' }} required>
            <InputLabel id="demo-customized-select-label">Venture</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={payload.venture}
              label="Venture"
              onChange={onVentureChange}
            >
              <MenuItem value="">None</MenuItem>
              {ventures.map((v) => (
                <MenuItem key={v._id} value={v._id}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" classes={{ root: 'lead-input flat' }} disabled={payload.venture === ''}>
            <InputLabel id="demo-customized-select-label">Flat</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={payload.flat_no}
              onChange={onFlatChange}
              label="Flat"
            >
              <MenuItem value="">None</MenuItem>
              {payload.venture !== '' &&
                ventures
                  .find((v) => v._id === payload.venture)
                  .available.map((flat) => (
                    <MenuItem key={flat} value={flat}>
                      {flat}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <br />

          <FormControl variant="outlined" classes={{ root: 'lead-input' }}>
            <InputLabel id="demo-customized-select-label">Assign To</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={payload.employee_assigned}
              onChange={onEmployeeChange}
              label="Assign To"
            >
              <MenuItem value="">None</MenuItem>
              {employees.map((e) => (
                <MenuItem key={e._id} value={e._id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />

          <FormControlLabel
            labelPlacement="start"
            label="Schedule Visit"
            control={<Checkbox color="primary" onChange={scheduleVisit} />}
            checked={payload.visit_scheduled}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              selectedDate={new Date('2014-08-18T21:11:54')}
              onChange={() => {}}
              showTodayButton
              open={isSchedulerOpen}
              onClose={toggleScheduler}
              onAccept={toggleScheduler}
              TextFieldComponent={() => (
                <IconButton aria-label="delete" onClick={toggleScheduler}>
                  <Event />
                </IconButton>
              )}
            />
          </MuiPickersUtilsProvider>

          <FormControlLabel
            labelPlacement="start"
            label="Follow up"
            checked={payload.followup_required}
            control={<Checkbox color="primary" onChange={scheduleFollowUp} />}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              selectedDate={new Date('2014-08-18T21:11:54')}
              onChange={() => {}}
              showTodayButton
              open={isSchedulerOpen}
              onClose={toggleScheduler}
              onAccept={toggleScheduler}
              TextFieldComponent={() => (
                <IconButton aria-label="delete" onClick={toggleScheduler}>
                  <Event />
                </IconButton>
              )}
            />
          </MuiPickersUtilsProvider>

          <br />

          <TextField
            id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            classes={{ root: 'lead-input' }}
            value={payload.value}
            onChange={onNotesChange}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={toggleModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onFormSubmit} color="primary" disabled={isDisabled()} type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
