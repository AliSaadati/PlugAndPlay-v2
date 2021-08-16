import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog, saveDialog} from '../../actions/dialog/dialogActions';

const SaveDialog = ({ handleClose }) => {

    const dispatch = useDispatch();
    const {open, title, value} = useSelector(state => state.dialog)

    const [saveDisabled, setSaveDisabled] = useState(false);
    const [saveViewInputMessage, setSaveViewInputMessage] = useState('Choose a unique view name.');

    const 
    return (
        <Dialog open={open} onClose={dispatch(closeDialog())} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {title}
                    </DialogContentText>
                    <TextField
                        error={saveDisabled}
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.name}
                        helperText={saveViewInputMessage}
                        onChange={(event) => {
                            setDialogValue({ ...dialogValue, name: event.target.value });
                            if (views.viewList.map(view => view.name).indexOf(event.target.value) > -1) {
                                setSaveDisabled(true);
                                setSaveViewInputMessage('View name in use, choose another name.')
                            } else if (event.target.value === '') {
                                console.log(event.target.value);
                                setSaveDisabled(true);
                                setSaveViewInputMessage('Choose a unique view name.')
                            } else {
                                setSaveDisabled(false);
                                setSaveViewInputMessage('Choose a unique view name.')
                            }
                        }}
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
                    <Button onClick={handleCloseWrapper} color="secondary">
                        Cancel
                    </Button>
                    <Button disabled={saveDisabled} type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default SaveDialog
