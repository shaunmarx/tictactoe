import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import SettingsIcon from 'material-ui-icons/Settings';
import classNames from 'classnames';
import Menu, {MenuItem} from 'material-ui/Menu';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styleSheet = createStyleSheet('DefaultLayout', theme => ({
    root: {
        height: "100%"
    },
    icon: { 
        margin: theme.spacing.unit 
    },
    iconPrimary: {
        fill: theme.palette.primary[500]
    },
    settings: {
        position: "absolute",
        right: 0,
        top: 0
    }
}));

const DefaultLayout = (props) => {
    let { classes, children, settingsOpen, onOpenSettingsMenu, onCloseSettingsMenu, onToggleUserDialog, anchorElement, createDialogVisible, dialog: Dialog } = props;
    return (
        <div className ={classes.root}>
            <Dialog/>

            <IconButton onClick={onOpenSettingsMenu} className={ classes.settings } ><SettingsIcon className={ classNames(classes.icon, classes.iconPrimary) }/></IconButton>
                <Menu
                    id="settingsmenu"
                    anchorEl={anchorElement}
                    open={settingsOpen}
                    onRequestClose={onCloseSettingsMenu}
                    >
                    <MenuItem onClick={onToggleUserDialog}>New User</MenuItem>
                </Menu>
            {children}
        </div>
    )
}


DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  settingsOpen: PropTypes.bool.isRequired,
  createDialogVisible: PropTypes.bool.isRequired,
  dialog: React.PropTypes.func,
  anchorElement: PropTypes.any,
  onOpenSettingsMenu: PropTypes.func,
  onCloseSettingsMenu: PropTypes.func,
  onToggleUserDialog: PropTypes.func,

};


export default withStyles(styleSheet)(DefaultLayout);