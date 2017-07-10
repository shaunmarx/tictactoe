import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames'; 

var styleSheet = createStyleSheet('BoardCell', theme => ({
    root: {
        display: "flex",
        border: "solid 1px #DDD",
        flex: 1,
        height: "25vh"
    },
    hitbox:{
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        display: "flex"
    },
    symbol: {
        fontSize: "7.5vw",
        width:"100%",
        lineHeight: "100%",
        textAlign: "center",
        display: "block"
    },
    winner: {
        color: "#FF0000"
    }
}));

const Cell = ({classes, onHandleMove, cell, isWinner }) => {
   
    var { value, index } = cell;
    function handleClick(e) {
        onHandleMove(index, e);
        e.preventDefault();
    }
   
    var symbol = null;
    if(value > 0){
        var symbolClasses = classNames(classes.symbol, { [classes.winner]: isWinner });
        symbol = value === 1 ? (<span className={ symbolClasses }>X</span>) : (<span className={ symbolClasses } >O</span>)
    }

    return (<div className={classes.root}>
        <a className={classes.hitbox} onClick={ handleClick }>
            {symbol}
        </a>
    </div>)
};

Cell.propTypes = {
  classes: PropTypes.object.isRequired,
  onHandleMove: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired,
  isWinner: PropTypes.bool
};

export default withStyles(styleSheet)(Cell);