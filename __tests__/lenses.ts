import {lensIndex, view} from 'ramda';
import {first, second} from '../src/lenses';

describe('first', () => {
    it('creates first element in a array lens', () => {
        const fst = first<string>();
        const data = ['one', 'two', 'three'];
        expect(view(fst, data)).toBe(view(lensIndex(0), data));
    });
});

describe('second', () => {
    it('creates second element in a array lens', () => {
        const snd = second<string>();
        const data = ['one', 'two', 'three'];
        expect(view(snd, data)).toBe(view(lensIndex(1), data));
    });
});
