import React, { useEffect, useRef } from 'react';
import theme from './theme'
import { ThemeProvider, AppBar, Toolbar } from '@material-ui/core';
import AccordionMenu from './components/accordian/AccordionMenu';
import DataTable from './components/dataTable/DataTable';
import { initializeState } from './actions/shared/sharedActions';
import { useSelector, useDispatch } from 'react-redux';

export default function App() {

  const dispatch = useDispatch();
  const hasLoaded = useRef(false);
  const fieldsLoading = useSelector(state => (!hasLoaded.current && state.fields));
  const viewsLoading = useSelector(state => (!hasLoaded.current && state.views.loading));

  useEffect(() => {
    if (!hasLoaded.current) {
      dispatch(initializeState())
    }
  }, [])

  if (!fieldsLoading.loading && !viewsLoading.loading)
    hasLoaded.current = true
  console.log('rendering app')
  return (
    <>
      {(fieldsLoading.loading || viewsLoading.loading) && !hasLoaded.current && <div>Loading...</div>}
      {!fieldsLoading.loading && !viewsLoading.loading && hasLoaded.current &&
        <ThemeProvider theme={theme}>
          <AppBar position='static'>
            <Toolbar></Toolbar>
          </AppBar>
          <AccordionMenu></AccordionMenu>
          <DataTable></DataTable>
        </ThemeProvider>
      }
    </>
  );
}

