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
            <Typography className={classes.heading}>{api.uniqueTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            <p>
                {api.subTitle}<br />
                {api.publisher}<br />
                {api.description}<br />
                {api.url}<br />
                {api.sourceUrl}<br />
                {api.inputModel}<br />
                {api.outputModel}<br />
                {api.isPaid}<br />
            </p>
            </Typography>
        </AccordionDetails>
        </Accordion>
        ))}
    </div>
    )
};

export default List