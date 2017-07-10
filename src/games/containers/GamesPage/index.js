import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../selectors';
import session from '../../../session';
import Layout from '../../../layout';
import * as actions from '../../actions';
import GamesList from '../../components/GamesList';
import ActiveGame from '../ActiveGame';
import { compose } from 'recompose';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

var styleSheet = createStyleSheet('GamesPage', theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch"
  },
  flex: {
      flex: 1
  },
  flex2: {
      flex: 2
  }
}));

const { DefaultLayout } = Layout;


class GamesPage extends React.Component {
    componentDidMount () {
  
        let { dispatch, user } = this.props;

        if(user !== null){
             dispatch(actions.requestGames(user.username));
        }
    }
    
    render(){
        let { activeGames, currentActiveGame, classes, dispatch } = this.props;
        var view = currentActiveGame ? (<ActiveGame/>) : (<Typography type="title" component="h3">No active games.</Typography>);
        var onNewGame = () => dispatch(actions.requestPracticeGame());

        return (<DefaultLayout>
            <div className={classes.root}>
                <div className={classes.flex}>
                    <GamesList games={activeGames} onNewGame={onNewGame}></GamesList>
                </div>
                <div className={classes.flex2}>
                    {view}
                </div>
            </div>
        </DefaultLayout>)
    }
}

GamesPage.propTypes = {
  activeGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentActiveGame: PropTypes.object
};


const mapStateToProps = state => ({
     user : session.selectors.getCurrentUser(state),
     activeGames: selectors.getActiveGames(state),
     currentActiveGame: selectors.getCurrentActiveGame(state)
});

const enhance = compose(
    connect(mapStateToProps),
    withStyles(styleSheet)
);

export default enhance(GamesPage);