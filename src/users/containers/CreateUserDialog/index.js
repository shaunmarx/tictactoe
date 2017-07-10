import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import session from '../../../session';
import users from '../../index';
import { compose, withState, withHandlers, setDisplayName } from 'recompose';
import CreateUserDialog from '../../components/CreateUserDialog';

var mapStateToProps = (state) => ({ 
    session : session.selectors.getSessionState(state),
    isAuthenticated : session.selectors.isAuthenticated(state),
    visible: users.selectors.getCreateDialogVisible(state),
    domain: session.selectors.getCurrentDomain(state)
});

const enhance = compose(connect(mapStateToProps),
    setDisplayName("CreateuserDialog"),
    withState('username', 'updateUsername', ''),
    withState('password', 'updatePassword', ''),
    withHandlers({
        onCloseDialog: ({ dispatch, updateSettingsOpen}) => event => {
            event.preventDefault();
            dispatch( users.actions.toggleUserDialog() );
        },
        onUsernameChange: props => event => {
            props.updateUsername(event.target.value)
        },
        onPasswordChange: props => event => {
            props.updatePassword(event.target.value)
        },
        onCreateUser: ({ dispatch, username, password, domain }) => event => {
            dispatch( users.actions.createUser(domain, username, password));
            event.preventDefault();
        }
    })
    
);

export default enhance(CreateUserDialog);

export { enhance };
