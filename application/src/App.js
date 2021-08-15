import React, { useEffect, useRef, useState } from 'react';
import theme from './theme'
import { ThemeProvider, AppBar, Fab } from '@material-ui/core';
import AccordionMenu from './components/accordian/AccordionMenu';
import DataTable from './components/dataTable/DataTable';
import { initializeState } from './actions/shared/sharedActions';
import { useSelector, useDispatch } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import SideDrawer from './components/sideDrawer/SideDrawer'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomToolbar from './components/toolbar/CustomToolbar'

import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "1px",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: { /**/
    width: `calc(100vw - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))
export default function App() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const hasLoaded = useRef(false);
  const fieldsLoading = useSelector(state => (!hasLoaded.current && state.fields));
  const viewsLoading = useSelector(state => (!hasLoaded.current && state.views.loading));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      dispatch(initializeState())
    }
  }, [])

  if (!fieldsLoading.loading && !viewsLoading.loading)
    hasLoaded.current = true
  return (
    <>
      {(fieldsLoading.loading || viewsLoading.loading) && !hasLoaded.current && <div>Loading...</div>}
      {!fieldsLoading.loading && !viewsLoading.loading && hasLoaded.current &&
        <>

          <ThemeProvider theme={theme}>
            <div style={{ display: 'flex' }}>
              <CssBaseline />
              <CustomToolbar open={open} setOpen={setOpen} />
              <SideDrawer open={open} setOpen={setOpen} />
              <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar} />
                <div>
                  <AccordionMenu></AccordionMenu>
                </div>
                <div>
                  <DataTable></DataTable>
                </div>
              </ main>
            </div>
            <Fab
              color="primary"
              style={{ zIndex: 3, position: 'fixed', bottom: '1rem', right: '1rem' }}>
              <GitHubIcon />
            </Fab>
          </ThemeProvider>
        </>
      }
    </>
  );
}

