/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import actions
import {
    somethingSaid
} from '../actions/app.actions';

import BallsNavigation from '../components/BallsNavigation';

export class Index extends Component {
    handleOnClick() {
        somethingSaid('Clicked!')(this.props.dispatch);
    }

    render() {
        const ballNavWidth = 640;
        const ballNavHeight = 480;
        const ballNavBallWidth = 100;
        const ballNavBallHeight = 100;

        return (
            <div>
                <h2 className={classNames({ title: true })}>{this.props.message}</h2>
                <button onClick={() => this.handleOnClick()}>Click</button>
                <BallsNavigation width={ballNavWidth} height={ballNavHeight}
                    ballWidth={ballNavBallWidth} ballHeight={ballNavBallHeight} />
            </div>
        );
    }
}

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

function mapStateToProps(reduction, ownProps) {
    return {
        message: reduction.getIn(['appState', 'message'])
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

