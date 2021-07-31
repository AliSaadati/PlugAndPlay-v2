import theme from './theme'
import { ThemeProvider, AppBar, Toolbar } from '@material-ui/core';
import AccordionMenu from './components/accordian/AccordionMenu';
import DataTable from './components/dataTable/DataTable';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <AppBar position='static'>
        <Toolbar></Toolbar>
      </AppBar>
      <AccordionMenu></AccordionMenu>
      <DataTable></DataTable>
    </ThemeProvider>
  );
}

export default App;
