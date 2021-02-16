import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    freeChip: {
        background: '#66cc00',
        color: "#fff",
        textTransform: 'uppercase',
        fontFamily: 'Monospace',
        fontWeight: '300',
    },
    paidChip: {
        background: '#e03e1e',
        textTransform: 'uppercase',
        fontFamily: 'Monospace',
        fontWeight: '300',
    }
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
            <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h7">
              {api.uniqueTitle}
            </Typography>
          </Grid>
          <Grid item>
            <Chip 
                size="small"
                label={api.isPaid? "Paid" : "Free"}
                color={api.isPaid? "Secondary" : "Primary"}
                className={api.isPaid? classes.paidChip : classes.freeChip} />
          </Grid>
        </Grid>
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
                Is Paid?: {api.isPaid.toString()}<br />
            </p>
            </Typography>
        </AccordionDetails>
        </Accordion>
        ))}
    </div>
    )
};

export default List