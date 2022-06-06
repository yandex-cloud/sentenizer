import {compose, map, reduce, split, and, or} from 'ramda';

import {
    lenLte,
    allEqual,
    lengthNonZero,
    charAt,
    notAlpha,
    startsWithLower,
    hasAlpha,
    isUpper,
} from '../src/utilities';

describe('lenLte', () => {
    it('should evaluate to true if array is less than or equal to provided value', () => {
        const ltes = [lenLte(3), lenLte(4), lenLte(0)];
        const expected = [false, true, false];
        const input = [1, 2, 3, 4];
        for (let i = 0; i < ltes.length; i++) {
            expect(ltes[i](input)).toBe(expected[i]);
        }
    });
});

describe('allEqual', () => {
    it('should evaluate to true if array consists of identical elements', () => {
        const input = [
            [1, 2, 3, 4],
            [1, 1, 1, 1],
            ['one', 'one'],
        ];
        const expected = [false, true, true];
        for (let i = 0; i < input.length; i++) {
            expect(allEqual(input[i])).toBe(expected[i]);
        }
    });
});

describe('lengthNonZero', () => {
    it('should evaluate to true if array has non zero length', () => {
        const input = [[], [1, 2]];
        const expected = [false, true];
        for (let i = 0; i < input.length; i++) {
            expect(lengthNonZero(input[i])).toBe(expected[i]);
        }
    });
});

describe('charAt', () => {
    it('behaves like String.charAt function', () => {
        const charAts = [charAt(0), charAt(1), charAt(2)];
        const input = '1234';
        const expected = split('')(input);
        for (let i = 0; i < charAts.length; i++) {
            expect(charAts[i](input)).toBe(expected[i]);
        }
    });
});

describe('notAlpha', () => {
    it('evaluates to true if string consists only of non alpha characters', () => {
        const input = ['qwerty', '1337', 'a16z'];
        const expected = [false, true, false];
        for (let i = 0; i < input.length; i++) {
            expect(notAlpha(input[i])).toBe(expected[i]);
        }
    });
});

describe('startsWithLower', () => {
    it('evaluates to true if string starts with lower case letters', () => {
        const input = ['a16z', 'Sentence about something.', 'foobar'];
        const expected = [true, false, true];
        for (let i = 0; i < input.length; i++) {
            // @ts-ignore (?) no idea why types are not inferred here
            expect(startsWithLower(input[i])).toBe(expected[i]);
        }
    });
});

describe('hasAlpha', () => {
    it('evaluates to true if string contains alpha characters', () => {
        const go = compose(reduce(and, true), map(hasAlpha));
        const input = ['a16z', 'Просто текст', 'Предложение с числами 1337.'];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(hasAlpha));
        const input = ['1337', '1984', '2019'];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('isUpper', () => {
    it('evaluates to true if all alpha inside string are in uppercase', () => {
        const go = compose(reduce(and, true), map(isUpper));
        const input = ['UPPERCASE STRING', 'CAPSLOCK', 'CAPS1337L0CK'];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(isUpper));
        const input = ['nOt uPpErCaSe', 'lowercase', 'l0w3r1337case'];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});
