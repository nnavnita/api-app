import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const List = ({ apis }) => {
    const classes = useStyles();
    return (
    <div>
        {apis.map((api) => (
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography className={classes.heading}>Unique Title: {api.uniqueTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            <p>
                Subtitle: {api.subTitle}<br />
                Publisher: {api.publisher}<br />
                Description: {api.description}<br />
                URL: {api.url}<br />
                Source URL: {api.sourceUrl}<br />
                Input Model: {api.inputModel}<br />
                Output Model: {api.outputModel}<br />
                Is Paid?: {api.isPaid}<br />
            </p>
            </Typography>
        </AccordionDetails>
        </Accordion>
        ))}
    </div>
    )
};

export default List