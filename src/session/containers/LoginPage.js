import React from 'react';
import './LoginPage.css';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { compose, setDisplayName, withHandlers, withState, withProps } from 'recompose';
import { Redirect } from 'react-router';
import config  from '../../config';

import * as selectors from '../selectors';
import * as actions from '../actions';

var styleSheet = createStyleSheet("Login", theme => ({
    title: {
        background : theme.palette.primary[500]
    },
    titleText:  {
        color: "#fff",
        padding: "0.5em"
    },
    page : {
        background: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        height: "100%"
    },
    input : {
        margin: theme.spacing.unit,
        flex: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    }  ,
    loginButton: {
        alignSelf: "center",
        margin: theme.spacing.unit
    },
}))

const LoginPage = (props) => {
    const { classes, onLogin, onUsernameChange, onPasswordChange, username, password, isAuthenticated} = props;
    if(isAuthenticated)
        return (<Redirect to={{
            pathname: '/',
            state: { from: props.location }
        }} />);

    return (<div className={ classes.page } >
        <div className="Login-form">
            <Card>
                <div className={ classes.title } > 
                    <Typography type="title" className={ classes.titleText } >Login</Typography>
                </div>
                <div className= { classes.container }>
                    <TextField id="username" label="Username" className={ classes.input } value={ username } onChange={ onUsernameChange } />
                    <TextField id="password" label="Password" className={ classes.input } value={ password } onChange={ onPasswordChange } type="password"/>
                    <Button className={classes.loginButton} raised onClick={ onLogin }>Login</Button>
                </div>
                
            </Card>
        </div>
    </div>)
};

var mapStateToProps =(state) => ({
    isAuthenticated: selectors.isAuthenticated(state)
});

const enhance = compose(
    connect(mapStateToProps),
    withStyles(styleSheet),
    withState('username', 'updateUsername', ''),
    withState('password', 'updatePassword', ''),
    withProps( props => ({...props, ...{domain: config.domain }})),
    withHandlers({
        onUsernameChange: props => event => {
            props.updateUsername(event.target.value)
        },
        onPasswordChange: props => event => {
            props.updatePassword(event.target.value)
        },
        onLogin: ({ username, password, domain, dispatch, ...rest }) => event => {
            event.preventDefault();
            dispatch(actions.requestToken(domain, username, password));
        }
    }),
    setDisplayName("LoginPageContainer")
)



export default enhance(LoginPage);

