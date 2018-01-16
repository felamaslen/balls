/* eslint-disable newline-per-chained-call */
import '../../browser';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import BallsNavigation, { LinkBall } from '../../../src/components/balls-navigation';

describe('<BallsNavigation />', () => {
    const wrapper = shallow(<BallsNavigation />);

    it('should render its basic structure', () => {
        expect(wrapper.is('div.balls-navigation')).to.equal(true);
        expect(wrapper.children()).to.have.length(3);
    });

    it('should render <LinkBall /> components for each link', () => {
        expect(wrapper.childAt(0).is(LinkBall)).to.equal(true);
        expect(wrapper.childAt(0).props()).to.deep.include({
            title: 'About',
            to: '/about',
            color: '#f00'
        });

        expect(wrapper.childAt(1).is(LinkBall)).to.equal(true);
        expect(wrapper.childAt(1).props()).to.deep.include({
            title: 'Page1',
            to: '/page1',
            color: '#0f0'
        });

        expect(wrapper.childAt(2).is(LinkBall)).to.equal(true);
        expect(wrapper.childAt(2).props()).to.deep.include({
            title: 'Page2',
            to: '/page2',
            color: '#00f'
        });
    });
});

describe('<LinkBall />', () => {
    const props = {
        to: '/foo',
        title: 'Foo',
        color: 'red'
    };

    const wrapper = shallow(<LinkBall {...props} />);

    it('should render its basic structure', () => {
        expect(wrapper.is(Link)).to.equal(true);
        expect(wrapper.props()).to.deep.include({
            to: '/foo'
        });
        expect(wrapper.childAt(0).text()).to.equal('Foo');
    });
});

