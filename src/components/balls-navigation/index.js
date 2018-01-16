import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { animateBall } from './anim';
import { navWidth, navHeight, ballRadius } from '../../constants/styles';

const ANIMATION_SPEED = 10;
const INITIAL_SPEED = 100;
const TURN_RATE_CHANGE_PROBABILITY = 0.2;
const TURN_RATE_CHANGE = Math.PI / 50;
const TURN_RATE_INITIAL = Math.PI / 200;
const MAX_TURN_RATE = Math.PI / 100;

export class LinkBall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posX: Math.random() * (navWidth - 2 * ballRadius),
            posY: Math.random() * (navHeight - 2 * ballRadius),
            direction: Math.random() * 2 * Math.PI,
            speed: INITIAL_SPEED * (1 + Math.random() * 2),
            turnRate: (2 * Math.random() - 1) * TURN_RATE_INITIAL,
            lastStepTime: Date.now(),
            timer: setTimeout(() => this.animate(), ANIMATION_SPEED)
        };
    }
    animate() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        const now = Date.now();

        let turnRate = this.state.turnRate;
        if (Math.random() < TURN_RATE_CHANGE_PROBABILITY) {
            turnRate = Math.max(MAX_TURN_RATE, Math.min(-MAX_TURN_RATE,
                (2 * Math.random() - 1) * TURN_RATE_CHANGE
            ));
        }

        this.setState({
            ...animateBall({
                stepTime: now - this.state.lastStepTime,
                speed: this.state.speed,
                direction: this.state.direction + this.state.turnRate,
                posX: this.state.posX,
                posY: this.state.posY
            }),
            turnRate,
            lastStepTime: now,
            timer: setTimeout(() => this.animate(), ANIMATION_SPEED)
        });
    }
    componentWillUnmount() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }
    }
    render() {
        const { to, title, color } = this.props;

        const style = {
            backgroundColor: color,
            left: `${this.state.posX - ballRadius}px`,
            top: `${this.state.posY - ballRadius}px`
        };

        return (
            <Link className="link ball" to={to} style={style}>{title}</Link>
        );
    }
}

LinkBall.propTypes = {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default function BallsNavigation() {
    const links = [
        { title: 'About', to: '/about', color: '#f00' },
        { title: 'Page1', to: '/page1', color: '#0f0' },
        { title: 'Page2', to: '/page2', color: '#00f' }
    ];

    const balls = links.map(({ to, ...link }) => (
        <LinkBall key={to} to={to} {...link} />
    ));

    return (
        <div className="balls-navigation">
            {balls}
        </div>
    );
}

