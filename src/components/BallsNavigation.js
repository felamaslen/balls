import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { animateBall } from '../ballAnim';

class LinkBall extends Component {
    constructor(props) {
        super(props);

        this.posX = Math.random() * 100;
        this.posY = Math.random() * 100;

        this.direction = Math.random() * 2 * Math.PI;
        this.speed = 1 + Math.random() * 2;

        this.posX = 0;
        this.posY = 0;
        this.direction = Math.PI / 4;
        this.speed = 10;

        this.ball = null;

        this.lastStepTime = Date.now();
        this.timerValue = 10;
        this.timer = setTimeout(() => this.animate(), this.timerValue);
    }
    animate() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        const { shiftX, shiftY } = animateBall({
            stepTime: Date.now() - this.lastStepTime,
            speed: this.speed,
            direction: this.direction,
            posX: this.posX,
            posY: this.posY,
            width: this.props.width,
            height: this.props.height,
            ballWidth: this.props.ballWidth,
            ballHeight: this.props.ballHeight
        });

        this.posX += shiftX;
        this.posY += shiftY;

        this.ball.style.left = `${this.posX}px`;
        this.ball.style.top = `${this.posY}px`;

        this.lastStepTime = Date.now();
        this.timer = setTimeout(() => this.animate(), this.timerValue);
    }
    render() {
        const style = {
            backgroundColor: this.props.color
        };

        const ref = elem => {
            this.ball = elem;
        };

        return <a className="link ball"
            href={this.props.link}
            ref={ref}
            style={style}>{this.props.link}</a>;
    }
}

LinkBall.propTypes = {
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ballWidth: PropTypes.number.isRequired,
    ballHeight: PropTypes.number.isRequired
};

export default class BallsNavigation extends Component {
    render() {
        const linkNames = ['link1']; // , 'link2', 'link3', 'link4'];

        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

        const links = linkNames.map((link, key) => {
            return <LinkBall width={this.props.width} height={this.props.height}
                ballWidth={this.props.ballWidth} ballHeight={this.props.ballHeight}
                key={key} link={link} color={colors[key % colors.length]} />;
        });

        return <div className="balls-navigation">
            {links}
        </div>;
    }
}

BallsNavigation.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    ballWidth: PropTypes.number.isRequired,
    ballHeight: PropTypes.number.isRequired
};

