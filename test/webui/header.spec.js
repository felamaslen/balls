import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/components/Header';

describe('<Header/>', () => {
    it('should have a nav element with app logo', () => {
        const wrapper = shallow(<Header />);

        expect(wrapper.find('div#nav')).to.have.lengthOf(1);
        expect(wrapper.find('div.app-logo')).to.have.lengthOf(1);
        expect(wrapper.find('div.app-logo a.logo')).to.have.lengthOf(1);
    });
});

