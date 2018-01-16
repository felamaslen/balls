import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateBall } from './anim';
import { navWidth, navHeight, ballRadius } from '../../constants/styles';

const ANIMATION_SPEED = 5;

class LinkBall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posX: Math.random() * (navWidth - 2 * ballRadius),
            posY: Math.random() * (navHeight - 2 * ballRadius),
            direction: Math.random() * 2 * Math.PI,
            speed: 1000 * (1 + Math.random() * 2),
            lastStepTime: Date.now(),
            timer: setTimeout(() => this.animate(), ANIMATION_SPEED)
        };
    }
    animate() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        const now = Date.now();

        this.setState({
            ...animateBall({
                stepTime: now - this.state.lastStepTime,
                speed: this.state.speed,
                direction: this.state.direction,
                posX: this.state.posX,
                posY: this.state.posY
            }),
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
            <a className="link ball" href={to} style={style}>{title}</a>
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
        // { title: 'About', to: '/about', color: '#f00' },
        // { title: 'Page1', to: '/page1', color: '#0f0' },
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

