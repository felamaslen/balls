import { expect } from 'chai';
import * as anim from '../../../src/components/balls-navigation/anim';
import { navWidth, navHeight, ballRadius } from '../../../src/constants/styles';

describe('Animation functions', () => {
    describe('getHitWall', () => {
        it('should return a new position, if there is no collision', () => {
            expect(anim.getHitWall({
                posX: 0,
                posY: 0,
                direction: 0
            }, 5))
                .to.deep.equal([5, 0]);
        });
    });
});

