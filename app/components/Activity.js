import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector, { timelineConnectorClasses } from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot, { timelineDotClasses }  from '@mui/lab/TimelineDot';

export default function Activity({items}) {
    const theme = useTheme();
    return (
        <Timeline
            sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0
                },
                [`& .${timelineItemClasses.root}`]: {
                    minHeight: 40
                },
                [`& .${timelineContentClasses.root}`]: {
                    fontSize: 14,
                    padding: '2px 16px 6px'
                },
                [`& .${timelineDotClasses.root}`]: {
                    margin: '8px 0',
                    padding: '2px'
                },
                [`& .${timelineConnectorClasses.root}`]: {
                    backgroundColor: theme.palette.primary.main
                },
            }}
        >

        {items.map((item, index) => (
            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot color="primary"/>
                {items.length !== (index + 1) && <TimelineConnector color="primary"/>}
                </TimelineSeparator>
                <TimelineContent>{item.text}</TimelineContent>
            </TimelineItem>
        ))}
        </Timeline>
    );
}