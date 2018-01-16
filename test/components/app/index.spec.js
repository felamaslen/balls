/* eslint-disable newline-per-chained-call */
import '../../browser';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import App, { About, Page1, Page2 } from '../../../src/components/app';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../../../src/components/header';
import BallsNavigation from '../../../src/components/balls-navigation';

describe('<App />', () => {
    const props = {
        history: { foo: 'bar' }
    };

    const wrapper = shallow(<App {...props} />);

    it('should render its basic structure', () => {
        expect(wrapper.is('div.balls-app-root')).to.equal(true);
        expect(wrapper.children()).to.have.length(1);
    });

    it('should render a router', () => {
        expect(wrapper.childAt(0).is(Router)).to.equal(true);
        expect(wrapper.childAt(0).props()).to.deep.include({
            history: props.history
        });

        expect(wrapper.childAt(0).children()).to.have.length(1);
        expect(wrapper.childAt(0).childAt(0).is('div')).to.equal(true);

        expect(wrapper.childAt(0).childAt(0).children()).to.have.length(2);
    });

    it('should render a header', () => {
        expect(wrapper.childAt(0).childAt(0).childAt(0).is(Header)).to.equal(true);
    });

    it('should render a switch with routes', () => {
        expect(wrapper.childAt(0).childAt(0).childAt(1).is(Switch)).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(1).children()).to.have.length(4);

        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).is(Route)).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).props()).to.deep.include({
            exact: true,
            path: '/',
            component: BallsNavigation
        });

        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).is(Route)).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(1).props()).to.deep.include({
            exact: true,
            path: '/about',
            component: About
        });

        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(2).is(Route)).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(2).props()).to.deep.include({
            exact: true,
            path: '/page1',
            component: Page1
        });

        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(3).is(Route)).to.equal(true);
        expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(3).props()).to.deep.include({
            exact: true,
            path: '/page2',
            component: Page2
        });
    });
});

describe('<About />', () => {
    const wrapper = shallow(<About />);

    it('should render its basic structure', () => {
        expect(wrapper.is('div.page.page-about')).to.equal(true);
        expect(wrapper.children()).to.have.length(1);
    });

    it('should render a title', () => {
        expect(wrapper.childAt(0).is('h1')).to.equal(true);
        expect(wrapper.childAt(0).text()).to.equal('About');
    });
});

describe('<Page1 />', () => {
    const wrapper = shallow(<Page1 />);

    it('should render its basic structure', () => {
        expect(wrapper.is('div.page.page-1')).to.equal(true);
        expect(wrapper.children()).to.have.length(1);
    });

    it('should render a title', () => {
        expect(wrapper.childAt(0).is('h1')).to.equal(true);
        expect(wrapper.childAt(0).text()).to.equal('Page 1');
    });
});

describe('<Page2 />', () => {
    const wrapper = shallow(<Page2 />);

    it('should render its basic structure', () => {
        expect(wrapper.is('div.page.page-2')).to.equal(true);
        expect(wrapper.children()).to.have.length(1);
    });

    it('should render a title', () => {
        expect(wrapper.childAt(0).is('h1')).to.equal(true);
        expect(wrapper.childAt(0).text()).to.equal('Page 2');
    });
});
