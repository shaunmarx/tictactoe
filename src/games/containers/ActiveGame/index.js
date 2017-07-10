import React from 'react';
import Board from '../../components/Board';
import session from '../../../session';
import * as selectors from '../../selectors';
import { compose } from 'recompose';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import uuid from 'uuid/v4';

var styleSheet = createStyleSheet('ActiveGame', theme => ({
    root: { 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
}));

const ActiveGame = ({classes, game, user,  dispatch}) => {
    var requestMove = (index) => {

        dispatch(actions.requestMove(game.id, user.username, index));
    }
    var items = [];

    if(!game.active){
        items.push(<Typography key={uuid()} type="headline" component="h2">{game.status}</Typography>)
    }
    if(game.winner){
        items.push(<Typography key={uuid()} component="p">{game.winner.user}</Typography>)
    }
    
    return (<div className={classes.root}> 
        <Board positions={game.board} onHandleMove={requestMove} winner={game.winner} ></Board>
        {items}
    </div>)
}

ActiveGame.propTypes = {
  classes: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
     user : session.selectors.getCurrentUser(state),
     game: selectors.getCurrentActiveGame(state)
});

const enhance = compose(
    connect(mapStateToProps),
    withStyles(styleSheet)
);

export default enhance(ActiveGame);