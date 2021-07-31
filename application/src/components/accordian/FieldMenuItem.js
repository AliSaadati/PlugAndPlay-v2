import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFields } from '../../actions/fields/fieldActions';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {
    TextField,
    InputAdornment
} from "@material-ui/core";

import {
    Search as SearchIcon
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: '1.75rem'
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxHeight: '6rem',
        overflow: 'auto',
        paddingTop: 0
    },
    listItem: {
        maxHeight: '2rem',
        display: 'flex'
    },
    listItemAll: {
        backgroundColor: '#f9f9f9',
        maxHeight: '3rem',

            '&:hover, &:focus': {
            backgroundColor: '#ebebeb',

        },

    },
    listItemText: {
        fontWeight: 'bold'
    }
}));

export default function QueryMenuItem() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const fields = useSelector(state => state.fields);

    const [str, setStr] = useState("");
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        dispatch(fetchFields())
    }, [])

    const columnList = fields.fieldRows;

    const handleChange = event => {
        setStr(event.target.value);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggleAll = () => {
        const newChecked = [];

        if (checked.length !== columnList.length) {
            for (let s of columnList) {
                newChecked.push(s)
            }
        }
        setChecked(newChecked);
    }

    return (
        <>
            <TextField
                style={{ width: '100%' }}
                size="small"
                id="standard-basic"
                placeholder='Search Field Name'
                // inputProps={{
                //     style: { fontSize: 14 }
                // }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position='end'>
                            <SearchIcon fontSize='small' />
                        </ InputAdornment>
                }}
                InputLabelProps={{ shrink: false }}
                value={str}
                onChange={handleChange}
                className={classes.textField}
            />
            <ListItem

                role={undefined}
                dense
                button
                onClick={handleToggleAll}
                className={classes.listItemAll}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.length == columnList.length}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': 'All Fields' }}
                        color="secondary"
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    id={'All Fields'}
                    primary={'Toggle All Fields'} />
            </ListItem>
            <List className={classes.list}>

                {columnList.map((value) => {
                    console.log(value)
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={value}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(value)}
                            className={classes.listItem}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                            <ListItemSecondaryAction >
                                <IconButton
                                    edge="end"
                                    aria-label="comments">
                                    <ControlPointIcon
                                        onClick={(event) => event.stopPropagation()}
                                        htmlColor="#44acff" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}

