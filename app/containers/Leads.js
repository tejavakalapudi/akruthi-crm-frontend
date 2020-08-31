/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
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
    id: 1234,
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

export default () => {
  return (
    <div>
      <ReactHelmet title="Dashboard" meta="Discover your leads" />
      <div>Leads</div>
    </div>
  );
};

// https://dribbble.com/shots/6773387-Sales-orders-list?utm_source=Clipboard_Shot&utm_campaign=antonyefimenko&utm_content=Sales%20orders%20list&utm_medium=Social_Share
// https://dribbble.com/shots/5465599-Order-Management?utm_source=Clipboard_Shot&utm_campaign=tsibulski&utm_content=Order%20Management&utm_medium=Social_Share
// https://dribbble.com/shots/7227376-Accounts-List-View?utm_source=Clipboard_Shot&utm_campaign=Ashmita&utm_content=Accounts%20List%20View&utm_medium=Social_Share
