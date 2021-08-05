import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentView, fetchViews } from '../../actions/views/viewActions';

const filter = createFilterOptions();

const useStyles = makeStyles(() => ({
  cssLabel: {
    color: "#aaa"
  },
}))

export default function FreeSoloCreateOptionDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Global State
  const views = useSelector(state => state.views);
  const columns = useSelector(state => state.columns);
  const querys = useSelector(state => state.querys);

  // Local State
  const [value, setValue] = useState({ name: views.currentView.name, type: views.currentView.type });
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({ name: '', type: '' });

  // Close Dialog
  const handleClose = () => {
    setDialogValue({
      name: '',
      type: '',
    });

    toggleOpen(false);
  };

  // Submit Dialog
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValue({
      name: dialogValue.name,
      type: dialogValue.type
    });
    saveView(dialogValue)
      .then((res) => {
        dispatch(fetchViews());
        return res;
      })
      .then((res) => {
        console.log(res)
        dispatch(setCurrentView({ ...dialogValue, id: res.body.id }));
        console.log('setting current view')
      });

    handleClose();
  };

  async function saveView(currView) {

    let response = await fetch("/save", {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ view: currView, columns: columns.columnList, queries: querys.queryList })
    });

    let json = await response.json();

    return { status: response.status, body: json }
  }

  return (
    <>
      <Autocomplete
        size='small'
        value={value}
        onChange={(event, newValue) => {
          console.log('here')
          // value other than one from the dropdown is pressed "Enter" on
          if (typeof newValue === 'string') {
            
            // Timeout needed to prevent dialog box from instantly validating
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                type: 'default',
              });
            })

            // "Add" button is clicked on from dropdown
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              type: 'default',
            });

            // value from list is chosen
          } else if (newValue) {
            setValue(newValue);
            dispatch(setCurrentView(newValue));
          }

        }}

        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '' && !views.viewList.map(view => view.name).includes(params.inputValue)) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}

        id="view-dropdown"
        options={views.viewList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        style={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            fullWidth
            label="Select or Create View"
            variant="standard" />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
              label="title"
              type="text"
            />
            <TextField
              margin="dense"
              id="type"
              value={dialogValue.type}
              onChange={(event) => setDialogValue({ ...dialogValue, type: event.target.value })}
              label="type"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}