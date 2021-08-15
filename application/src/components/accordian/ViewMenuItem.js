import React, { useEffect } from 'react';
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles"

import { fetchQuerys } from '../../actions/querys/queryActions';
import FreeSoloCreateOptionDialog from '../input/FreeSoloCreateOptionDialogue'
import { saveView } from '../../actions/views/viewActions';

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
    const columns = useSelector(state => state.columns);
    const currView = useSelector(state => state.views.currentView);
    const querys = useSelector(state => state.querys);

    const disptach = useDispatch();
    
    useEffect(() => {
        
    }, [])
 
    const saveViewHandler = async () => {

        // let response = await fetch("/save", {
        //   method: 'POST',
        //   cache: 'no-cache',
        //   headers: { 'Content-Type': 'application/json' },
        //   referrerPolicy: 'no-referrer',
        //   body: JSON.stringify({ view: currView, columns: columns.columnList, querys: querys.queryList })
        // });
    
        // let json = await response.json();
        
        // return { status: response.status, body: json }

        disptach(saveView())
      }

    return (
        <>
            <FreeSoloCreateOptionDialog style={{ width: '100%' }} />
            <div className={classes.buttonContainer}>
                <div>
                    <Button
                        size="small"
                        style={{ marginRight: '.5rem' }}
                        variant='contained'
                        color="primary"
                        onClick={saveViewHandler}
                        disableElevation>Save</Button>
                    <Button
                        size="small"
                        // variant='outlined'
                        color="primary">Save As</Button>
                </div>
                <div>
                    <Button
                        size="small"
                        variant='contained'
                        color="secondary"
                        disableElevation>Delete</Button>
                </div>
            </div>
        </>
    )
}

