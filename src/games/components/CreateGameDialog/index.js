import React from 'react';
import { withTheme, createStyleSheet, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

var styleSheet = createStyleSheet("CreateGameDialog", theme => ({
    input : {
        margin: theme.spacing.unit,
        flex: 1
    },
    createButton: {
        alignSelf: "center",
        margin: theme.spacing.unit
    },
}))

const CreateGameDialog = ({classes, visible, onCloseDialog, onCreateGame }) => (     
    <Dialog open={visible} onRequestClose={onCloseDialog}>
        <DialogTitle>
            {"New Game"}
        </DialogTitle>
        <DialogContent>
            <div>
                <Typography type="headline" component="h2">Practice Game</Typography>
            </div>
            <div>
                <Typography type="headline" component="h2">Challenge Somebody</Typography>
            </div>
        
        </DialogContent>
        <DialogActions>
            <Button className={classes.createButton} raised onClick={ onCreateGame }>Login</Button>
        </DialogActions>
    </Dialog>
)

export default withStyles(styleSheet)(CreateGameDialog);