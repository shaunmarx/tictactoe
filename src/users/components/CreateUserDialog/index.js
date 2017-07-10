import React from 'react';
import { withTheme, createStyleSheet, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

var styleSheet = createStyleSheet("CreateUserDialog", theme => ({
    input : {
        margin: theme.spacing.unit,
        flex: 1
    },
    createButton: {
        alignSelf: "center",
        margin: theme.spacing.unit
    },
}))

const CreateUserDialog = ({classes, visible, onCloseDialog, onCreateUser, username, password, onUsernameChange, onPasswordChange }) => (     
    <Dialog open={visible} onRequestClose={onCloseDialog}>
        <DialogTitle>
            {"Create New User"}
        </DialogTitle>
        <DialogContent>
            
            <TextField id="username" label="Username" className={ classes.input } value={ username } onChange={ onUsernameChange } />
            <TextField id="password" label="Password" className={ classes.input } value={ password } onChange={ onPasswordChange } type="password"/>
            
        </DialogContent>
        <DialogActions>
            <Button className={classes.createButton} raised onClick={ onCreateUser }>Create</Button>
        </DialogActions>
    </Dialog>
)

CreateUserDialog.propTypes = {
  classes : PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  onCreateUser: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  onUsernameChange : PropTypes.func,
  onPasswordChange: PropTypes.func
};


export default withStyles(styleSheet)(CreateUserDialog);