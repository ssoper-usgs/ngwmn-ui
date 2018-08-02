import { getScaleX, getScaleY } from './scales';


describe('graph component scales state', () => {
    describe('getScaleX', () => {
        let scale = getScaleX.resultFunc([0, 100], {width: 50});

        it('scale created', () => {
            expect(scale).toEqual(jasmine.any(Function));
        });

        it('returns specified domain', () => {
            expect(scale.domain()).toEqual([0, 100]);
        });

        it('returns range equal to width', () => {
            expect(scale.range()).toEqual([0, 50]);
        });
    });

    describe('getScaleY', () => {
        let scale = getScaleY.resultFunc([0, 100], {height: 50});

        it('scale created', () => {
            expect(scale).toEqual(jasmine.any(Function));
        });

        it('returns specified domain', () => {
            expect(scale.domain()).toEqual([0, 100]);
        });

        it('returns range equal to height', () => {
            expect(scale.range()).toEqual([0, 50]);
        });
    });
});
