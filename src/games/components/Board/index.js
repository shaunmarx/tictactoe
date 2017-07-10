import React from 'react';
import * as utils from '../../utils/board';
import { splitEvery, compose } from 'ramda';
import Row from './Row';
import uuidV4 from 'uuid/v4';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';


var styleSheet = createStyleSheet('Board', theme => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        marginRight: "3em",
        alignItems: "stretch",
        width:"50%",
        alignSelft : "center"
    },
    grid:{
        width:"100%"
    }

}));

const Board = ({positions, classes, onHandleMove, winner}) => {
    let size = utils.getBaseSize(positions);
    var winnerIndex = {};
    if(winner){
        winner.positions.map(x => winnerIndex[x] = x);
    }

    var rows = splitEvery(size, positions.map((value, index) => { 
        return { id: index, index, value };
    }));
        
    return (<Paper className={classes.root} elevation={4}>
        <Grid container gutter={0}>
            { rows.map((row, index) => (<Row key={uuidV4()} cells={row} onHandleMove={onHandleMove} winners={winnerIndex} />)) }
        </Grid>
    </Paper>);
}


Board.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onHandleMove: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  winner: PropTypes.object
};


export default withStyles(styleSheet)(Board);

