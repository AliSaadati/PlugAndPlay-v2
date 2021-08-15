import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';

import {useSelector, useDispatch} from 'react-redux';
import { fetchRows } from '../../actions/rows/rowActions';
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}));

export default function SideDrawer({open, setOpen}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const runQueryHandler = () => {
        dispatch(fetchRows())
    }
    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem onClick={runQueryHandler} button>
                        <ListItemIcon><PlayArrowIcon/></ListItemIcon>
                        <ListItemText primary="Run Query" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><GetAppIcon /></ListItemIcon>
                        <ListItemText primary="Download Table" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary="Add View" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SaveIcon /></ListItemIcon>
                        <ListItemText primary="Save View" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary="Save View As" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}