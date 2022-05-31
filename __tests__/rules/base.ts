import {
    compose,
    map,
    reduce,
    zip,
    juxt,
    or,
    and,
    split,
    join,
    concat,
    always,
    filter,
    not,
    equals,
} from 'ramda';

import {
    SENTENCE_END_MARKERS,
    QUOTATION_GENERIC_MARKERS,
    QUOTATION_CLOSE_MARKERS,
    BRACKETS_CLOSE,
} from '../../src/constants';

import {
    spaceBothSides,
    rightLacksSpacePrefix,
    rightStartsWithLowercase,
    rightDelimiterPrefix,
    rightQuotationGenericPrefix,
    rightQuotationClosePrefix,
    rightBracketsClosePrefix,
    rightOnlySpaces,
} from '../../src/rules';

describe('spaceBothSides', () => {
    it('evaluates to true if both sides have spaces on their adjacent bounds', () => {
        const input = ['left. ', ' right'];
        const expected = true;
        const actual = spaceBothSides(input);
        expect(actual).toBe(expected);
    });

    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(spaceBothSides));
        const input = [
            ['left.', 'right'],
            ['left. ', 'right'],
            ['left.', ' right'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightLacksSpacePrefix', () => {
    it('evaluates to true if right lacks space prefix', () => {
        const go = compose(reduce(and, true), map(rightLacksSpacePrefix));
        const input = [
            ['left.', 'right'],
            ['left.', 'Right'],
            ['left.', '.Right'],
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightLacksSpacePrefix));
        const input = [
            ['left.', ' right'],
            ['left.', ' Right'],
            ['left.', ' .Right'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightStartsWithLowercase', () => {
    it('evaluates to true if right starts with lowercase letter', () => {
        const go = compose(reduce(and, true), map(rightStartsWithLowercase));
        const input = [
            ['left.', 'right'],
            ['left.', ' right'],
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightStartsWithLowercase));
        const input = [
            ['left.', '.right'],
            ['left.', ' .right'],
            ['left.', 'Right'],
            ['left.', ' Right'],
            ['left.', '.Right'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightDelimiterPrefix', () => {
    const delimiters = split('')(SENTENCE_END_MARKERS);
    it(`evaluates to true if right starts with delimiter: ${join(' | ')(delimiters)}`, () => {
        const go = compose(reduce(and, true), map(rightDelimiterPrefix));
        const left = map(always('left'), delimiters);
        const right = juxt(map(concat, delimiters))('right');
        const input = zip(left, right);
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightDelimiterPrefix));
        const input = [
            ['left.', ' right'],
            ['left.', 'right'],
            ['left.', 'Right'],
            ['left.', '^right'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightQuotationGenericPrefix', () => {
    const quotations = split('')(QUOTATION_GENERIC_MARKERS);
    it(`evaluates to true if right starts with generic quotation: ${join(' | ')(
        quotations,
    )}`, () => {
        const go = compose(reduce(and, true), map(rightQuotationGenericPrefix));
        const left = map(always('left'), quotations);
        const right = juxt(map(concat, quotations))('right');
        const input = zip(left, right);
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightQuotationGenericPrefix));
        const input = [
            ['left.', 'right'],
            ['left.', 'Right'],
            ['left.', '.right'],
            ['left.', '*right'],
            ['left.', '    '],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightQuotationClosePrefix', () => {
    const quotations = split('')(QUOTATION_CLOSE_MARKERS);
    it(`evaluates to true if right starts with close quotation: ${join(' | ')(quotations)}`, () => {
        const go = compose(reduce(and, true), map(rightQuotationClosePrefix));
        const left = map(always('left'), quotations);
        const right = juxt(map(concat, quotations))('right');
        const input = zip(left, right);
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightQuotationClosePrefix));
        const input = [
            ['left.', 'right'],
            ['left.', 'Right'],
            ['left.', '.right'],
            ['left.', '*right'],
            ['left.', '     '],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightBracketsClosePrefix', () => {
    const notBackslash = compose(not, equals('\\'));
    const brackets = compose(filter(notBackslash), split(''))(BRACKETS_CLOSE);
    it(`evaluates to true if right starts with close bracket: ${join(' | ')(brackets)}`, () => {
        const go = compose(reduce(and, true), map(rightBracketsClosePrefix));
        const left = map(always('left'), brackets);
        const right = juxt(map(concat, brackets))('right');
        const input = zip(left, right);
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightBracketsClosePrefix));
        const input = [
            ['left.', ' right'],
            ['left.', 'right'],
            ['left.', 'Right'],
            ['left.', '&right'],
            ['left.', '   '],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('rightOnlySpaces', () => {
    it('evaluates to true if right consists only of space characters', () => {
        const go = compose(reduce(and, true), map(rightOnlySpaces));
        const input = [
            ['left.', '    '],
            ['left.', ' '],
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(rightOnlySpaces));
        const input = [
            ['left.', ''],
            ['left.', ' right'],
            ['left.', 'right '],
            ['left.', '*right token'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});
