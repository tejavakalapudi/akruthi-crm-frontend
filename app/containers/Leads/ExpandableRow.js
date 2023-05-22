import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Checkbox, TableRow, TableCell, TableBody, Table, Chip, Link } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { PopOver, Activity } from '../../components';


const useStyles = makeStyles((theme) => ({
    rightMargin: {
      marginRight: 10,
    }
}));

function ExpandableRow ({onEdit, lead, checkedItems, handleRowCheck, statuses } ) {
    const classes = useStyles();
    const statusList = statuses.map((status) => status.name);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [isCollapsed, toggleRow] = useState(false);

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

    return (
        <>
            <TableRow
                key={lead._id}
            >
                <TableCell component="th" scope="row">
                <Checkbox
                    key={lead._id}
                    checked={checkedItems.includes(lead._id)}
                    color="primary"
                    size="small"
                    onClick={(e) => {
                    e.stopPropagation();
                    handleRowCheck(lead._id);
                    }}
                />
                </TableCell>
                <TableCell component="th">{lead.customer_name}</TableCell>
                <TableCell>{lead.contact}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.venture ? lead.venture.name : ''}</TableCell>
                <TableCell>{lead.flat_no ? lead.flat_no  : ''}</TableCell>
                <TableCell>{lead.employee_assigned ? lead.employee_assigned.name : ''}</TableCell>
                {activeRow === lead._id && (
                <PopOver
                    formatStatusField={formatStatusField}
                    statusList={statusList}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    activeStatus={lead.status}
                    selectStatus={() => {}}
                />
                )}
                <TableCell>
                    <Chip
                        label={formatStatusField(lead.status)}
                        classes={{ root: 'chip' }}
                        className={lead.status}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleClick(event, lead._id);
                        }}
                        selectprops={{
                            native: true,
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Link 
                        component="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(!isCollapsed)
                        }}
                        className={classes.rightMargin}
                    >
                        Details
                    </Link>
                    <Link 
                        component="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(lead);
                        }}
                        className={classes.rightMargin}
                    >
                        Edit
                    </Link>
                    <Link 
                        component="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(lead, true)
                        }}   
                    >
                        Notes
                    </Link>
                </TableCell>
            </TableRow>
            {isCollapsed &&
                <TableRow>
                    <TableCell component="td" colSpan="9">
                        <div style={{ padding: 10 }}>
                            <div>
                                Visit Scheduled: {lead.visit_scheduled ? dayjs(lead.visit_scheduled).format("DD/MM/YYYY") : 'None'}
                            </div>
                            <div>
                                Follow up: {lead.followup ? dayjs(lead.followup).format("DD/MM/YYYY") : 'None'}
                            </div>
                        </div>

                        {lead.notes.length > 0 &&
                            <Activity items={lead.notes}/>
                        }
                    </TableCell>
                </TableRow>
            }
        </>
    )
};

export default ExpandableRow;