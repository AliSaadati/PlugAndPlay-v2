import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { fetchViews, setCurrentView } from '../../actions/fields/fieldActions';

import { makeStyles } from "@material-ui/core/styles"

import FreeSoloCreateOptionDialog from '../input/FreeSoloCreateOptionDialogue'

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        paddingTop: '1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%'
    }
}));

export default function ViewMenuItem() {

    const classes = useStyles()

    return (
        <>
            <FreeSoloCreateOptionDialog style={{ width: '100%' }} />
            <div className={classes.buttonContainer}>
                <div>
                    <Button 
                        size="small" 
                        style={{ marginRight: '.5rem' }} 
                        variant='contained' 
                        color="primary">Save</Button>
                    <Button 
                        size="small" 
                        variant='contained' 
                        color="secondary">Save As</Button>
                </div>
                <div>
                    <Button 
                        size="small" 
                        variant='contained'
                        color="secondary">Delete</Button>
                </div>
            </div>
        </>
    )
}

