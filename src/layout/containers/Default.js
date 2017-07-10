import React from 'react';
import DefaultLayout from '../components/Default';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import session from '../../session';
import users from '../../users';
import { compose, withState, withHandlers, setDisplayName, withProps } from 'recompose';
import CreateUserDialog from '../../users/containers/CreateUserDialog';

 const RequireAuthentication = (Component) => 
    (props) => {
        var {isAuthenticated} = props;
        
        return isAuthenticated ? 
        (<Component {...props}/>) : 
        (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}/>
    );
}

var mapStateToProps = (state) => { 
    return {
        session : session.selectors.getSessionState(state),
        isAuthenticated : session.selectors.isAuthenticated(state),
        createDialogVisible: users.selectors.getCreateDialogVisible(state)
    }
};

const enhance = compose(connect(mapStateToProps),
    setDisplayName("DefaultLayoutContainer"),
    withProps( props => ({ ...props, dialog: CreateUserDialog })),
    withState('settingsOpen', 'updateSettingsOpen', false),
    withState('anchorElement', 'updateAnchorElement', undefined),
    withHandlers({
        onCloseSettingsMenu: (props) => event => {
             props.updateSettingsOpen(false)
             event.preventDefault();
        },
        onOpenSettingsMenu: (props) => event => {
            props.updateAnchorElement(event.target);
            props.updateSettingsOpen(true)

             event.preventDefault();
        },
        onToggleUserDialog: ({ dispatch, updateSettingsOpen}) => event => {
            event.preventDefault();
            dispatch( users.actions.toggleUserDialog() );
            updateSettingsOpen(false);
        }
    }),
)

export default enhance(RequireAuthentication(DefaultLayout));
