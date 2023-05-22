import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
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
} from '@mui/material/';

import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LeadsActions } from '../../redux/actions';
import { objectDifference } from "../../utils/objectDifference";

export default ({ open, toggleModal, activeLead, isEdit, isNotesEnabled, currentUser }) => {
  const dispatch = useDispatch();
  const requiredFields = ['name', 'contact', 'venture', 'email'];
  const { ventures, employees } = useSelector((state) => state);

  const [currentNote, setCurrentNote] = useState('');
  const [payload, setPayload] = useState({
    customer_name: '',
    contact: '',
    email: '',
    venture: {
      _id: '',
      name: '',
    },
    flat_no: '',
    employee_assigned: {
      _id: '',
      name: '',
    },
    followup: null,
    visit_scheduled: null,
    notes: [],
    status: 'lead_generated',
  });

  useEffect(() => {
    if (payload.customer_name !== activeLead.customer_name) {
      console.log('______RECURRING', activeLead, payload);

      // const test = {
      //   status: 'lead_generated',
      //   source: 'Housing.com',
      //   pre_sale: true,
      //   post_sale: false,
      //   followup_required: true,
      //   _id: 'd4f25b71-a8d5-4d68-9c03-74c9a0132780',
      //   customer_name: 'Gopal Naidu',
      //   notes: [
      //     {
      //       createdAt: '2020-09-21T15:38:56.268Z',
      //       _id: '5f68c91056bd996f66b4ead4',
      //       text: 'I am interested in this project',
      //       source: 'Housing.com',
      //     },
      //     {
      //       createdAt: '2020-09-21T15:38:56.268Z',
      //       _id: '5f68c91056bd996f66b4ead5',
      //       text: 'Interested in  Sri Gayatri Towers Nizampet',
      //       source: 'Housing.com',
      //     },
      //   ],
      //   contact: "'+91-9000785777",
      //   email: 'polurugopal@gmail.com',
      //   __v: 0,
      //   createdAt: '2020-09-21T15:38:56.352Z',
      //   updatedAt: '2020-09-21T15:38:56.352Z',
      // };

      //_.omit(activeLead, ['pre_sale', 'post_sale', '__v', '_id', 'createdAt', 'updatedAt'])
      setPayload({
        ...activeLead,
        venture: activeLead.venture,
        employee_assigned: activeLead.employee_assigned,
      });
    }
  }, [activeLead.customer_name]);

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
    const selectedVenture = ventures.filter((v) => v._id === e.target.value).map(({ _id, name }) => ({ _id, name }));
    setPayload({
      ...payload,
      venture: selectedVenture[0],
    });
  };

  const onFlatChange = (e) => {
    setPayload({
      ...payload,
      flat_no: e.target.value,
    });
  };

  const onEmployeeChange = (e) => {
    const selectedEmployee = employees
      .filter((emp) => emp._id === e.target.value)
      .map(({ _id, name }) => ({ _id, name }));

    setPayload({
      ...payload,
      employee_assigned: selectedEmployee[0],
    });
  };

  const scheduleVisit = (e) => {
    setPayload({
      ...payload,
      visit_scheduled: e.toISOString(),
    });
  };

  const scheduleFollowUp = (e) => {
    setPayload({
      ...payload,
      followup: e.toISOString(),
    });
  };

  const onNotesChange = (e) => {

    // setPayload({
    //   ...payload,
    //   notes: [...payload.notes, e.target.value]
    // });

    setCurrentNote(e.target.value);
  };

  const isDisabled = () => {
    return requiredFields.some((value) => payload[value] === '');
  };

  const onFormSubmit = () => {

    let modifiedPayload = {...payload};

    if(isNotesEnabled && currentNote.length > 0){
      modifiedPayload = {
        ...modifiedPayload,
        notes: [
          ...modifiedPayload.notes, 
          {
            text: currentNote,
            source: currentUser
          }
        ]
      }
    }
   
    const payloadDiff = objectDifference(activeLead, modifiedPayload);
    
    // isEdit
    dispatch(LeadsActions.setLead(payloadDiff, isEdit ? 'updateLead' : 'createLead', activeLead._id)).then(() => {
      toggleModal();
    });
  };

  return (
    <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle id="form-dialog-title">{isEdit ? 'Edit Lead' : 'Create a New Lead'}</DialogTitle>
      <Divider />

      <DialogContent>
        <form>
          {!isNotesEnabled ? 
            <>
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
              required
              classes={{ root: 'lead-input' }}
              onChange={onEmailChange}
            />
            <br />
  
            <FormControl variant="outlined" classes={{ root: 'lead-input venture' }} required>
              <InputLabel id="demo-customized-select-label">Venture</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={payload.venture._id}
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
                {payload.venture._id !== '' &&
                  ventures
                    .find((v) => v._id === payload.venture._id)
                    ?.available.map((flat) => (
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
                value={payload.employee_assigned._id}
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
            
            <div className='lead-input date-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker label="Schedule Visit" 
                value={dayjs(payload.visit_scheduled)}
                onChange={scheduleVisit}
              />
            </LocalizationProvider>
            </div>
            <FormControl variant="outlined" classes={{ root: 'lead-input date-picker' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Follow Up" 
                  value={dayjs(payload.followup)} 
                  onChange={scheduleFollowUp} 
                />
              </LocalizationProvider>
            </FormControl>
  
            <br />
            </>
            :
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
          }
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
