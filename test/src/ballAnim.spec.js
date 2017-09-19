import { expect } from 'chai';

import * as anim from '../../src/ballAnim';

describe('Ball animation', () => {
    describe('hitWall', () => {
        it('should detect hits to the left wall', () => {
            expect(anim.hitWall(1, 1, 2, Math.PI, 10, 10)).to.equal(0);
            expect(anim.hitWall(1, 1, 1, Math.PI, 10, 10)).to.deep.equal({
                shiftX: Math.cos(Math.PI),
                shiftY: Math.sin(Math.PI)
            });
            expect(anim.hitWall(1, 1, 2, Math.PI / 4, 10, 10)).to.deep.equal({
                shiftX: 2 * Math.cos(Math.PI / 4),
                shiftY: 2 * Math.sin(Math.PI / 4)
            });
        });
        it('should detect hits to the top wall', () => {
            expect(anim.hitWall(1, 1, 3, -Math.PI / 4, 10, 10)).to.equal(1);
        });
        it('should detect hits to the right wall', () => {
            expect(anim.hitWall(9, 1, 2, Math.PI / 6, 10, 10)).to.equal(2);
        });
        it('should detect hits to the bottom wall', () => {
            expect(anim.hitWall(1, 9, 2, Math.PI / 2, 10, 10)).to.equal(3);
        });
    });

    describe('reflectFromLeftWall', () => {
        it('should work as expected', () => {
            const posX = 1;
            const posY = 1;
            const distance = 2;
            const direction = Math.PI * 7 / 6;

            const expectedShiftX = 0.73205081 - 1;
            const expectedShiftY = -1;

            const { shiftX, shiftY } = anim.reflectFromLeftWall(distance, direction, posX, posY);

            expect(shiftX.toFixed(8)).to.equal(expectedShiftX.toFixed(8));
            expect(shiftY.toFixed(8)).to.equal(expectedShiftY.toFixed(8));
        });
    });
});

