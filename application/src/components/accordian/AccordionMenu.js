import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"

import {
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons"

import ViewMenuItem from './ViewMenuItem'
import FieldMenuItem from './FieldMenuItem'
import QueryMenuItem from './QueryMenuItem'

const useStyles = makeStyles((theme) => ({
    accordion: {
        height: '100%',
        padding: '.25rem .75rem'
    },
    accordionDetails: {
        flexWrap: 'wrap'
    },
    accordionContainer: {
        margin: '2rem'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 800,
        fontSize: '1rem',
        color: '#666'
    },

}));


export default function AccordionMenu() {

    const classes = useStyles();

    return (
        <div className={classes.accordionContainer}>
            <Accordion
                className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Views</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <ViewMenuItem />
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Fields</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <FieldMenuItem></FieldMenuItem>
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Queries</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <QueryMenuItem></QueryMenuItem>

                </AccordionDetails>
            </Accordion>
        </div>
    )
}