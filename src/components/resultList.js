import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    tabs: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    },
    title: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    subTitle: {
        fontSize: theme.typography.pxToRem(12),
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
        background: '#3792cb',
        textTransform: 'uppercase',
        fontFamily: 'Monospace',
        fontWeight: '300',
    },
    publisher: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightLight
    }
}));

const List = ({ apis }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
    <div>
        {apis.map((api) => (
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Grid container alignItems="center">
                <Grid container alignItems="center">
                    <Grid item xs>
                        <div className={classes.title}>
                        {api.uniqueTitle}
                        </div>
                    </Grid>
                    <Grid item>
                        <Chip 
                            size="small"
                            label={api.isPaid? "Paid" : "Free"}
                            color={api.isPaid? "Secondary" : "Primary"}
                            className={api.isPaid? classes.paidChip : classes.freeChip} />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs>
                    <div className={classes.subTitle}>
                        {api.subTitle}
                        </div>
                    </Grid>
                    <Grid item>
                    <div className={classes.publisher}>
                        <center>Added by {api.publisher}</center>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </AccordionSummary>
        <AccordionDetails>
            <div className={classes.tabs}>
            <AppBar position="static" color="inherit">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example">
                <Tab label="Info" {...a11yProps(0)} />
                <Tab label="Input Model" {...a11yProps(1)} />
                <Tab label="Output Model" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <p>{api.description}</p>
                    <div>{api.url}</div>
                    <div>{api.sourceUrl}</div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div>{api.inputModel}</div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <div>{api.outputModel}</div>
                </TabPanel>
            </SwipeableViews>
        </div>
        </AccordionDetails>
        </Accordion>
        ))}
    </div>
    )
};

export default List