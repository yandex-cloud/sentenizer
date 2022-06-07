/* eslint-disable @typescript-eslint/no-shadow */
import {
    compose,
    map,
    reduce,
    keys,
    toUpper,
    split,
    concat,
    flip,
    unnest,
    juxt,
    and,
    or,
} from 'ramda';

import {leftAbbreviation, pairAbbreviation, leftPairsTailAbbreviation} from '../../src/rules';
import {
    INITIALS,
    HEAD,
    TAIL,
    OTHER,
    HEAD_PAIR,
    TAIL_PAIR,
    OTHER_PAIR,
} from '../../src/constants/abbreviations';

const pairWith =
    (a: string) =>
    (b: string): [string, string] =>
        [b, a];

const keysWithRightFirstUpper = map(compose(pairWith(' С заглавной'), flip(concat)('.')));
const keysSpacesWithRightFirstUpper = map(compose(pairWith(' С заглавной'), flip(concat)('. ')));
const keysWithRightUpper = map(compose(pairWith(' ЗАГЛАВНЫЕ'), flip(concat)('.')));
const keysUpperWithRightUpper = map(compose(pairWith(' ЗАГЛАВНЫЕ'), flip(concat)('.'), toUpper));
const keysSpacesWithRightLower = map(compose(pairWith(' строчный'), flip(concat)('. ')));

const generateInput = compose(
    unnest,
    juxt([
        keysSpacesWithRightFirstUpper,
        keysWithRightFirstUpper,
        keysWithRightUpper,
        keysUpperWithRightUpper,
    ]),
    keys,
);

describe('leftAbbreviation', () => {
    it('evaluates to true if left is head, tail, initials abbreviation', () => {
        const go = compose(reduce(and, true), map(leftAbbreviation));
        const input = [
            ...generateInput(INITIALS),
            ...generateInput(HEAD),
            ...generateInput(TAIL),
            ...generateInput(OTHER),
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(leftAbbreviation));
        const input = [
            ['Пщ. ', ' Бдыщ'],
            ['Jacq. ', ' Lacan'],
            ['Мд!', 'Али'],
            ['Вс', ' Мейерхольд'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('pairAbbreviation', () => {
    it('evaluates to true if sides are known abbreviation pair delimited by dot', () => {
        const go = compose(reduce(and, true), map(pairAbbreviation));
        const generateCaps = map(compose(map(flip(concat)('.')), split('.'), toUpper));
        const generateSpaced = map(compose(map(flip(concat)('. ')), split('.')));
        const generateInput = compose(unnest, juxt([generateCaps, generateSpaced]), keys);
        const input = [
            ...generateInput(HEAD_PAIR),
            ...generateInput(TAIL_PAIR),
            ...generateInput(OTHER_PAIR),
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });

    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(pairAbbreviation));
        const input = [
            ['фоо.', 'бар.'],
            ['фоо. ', 'бар. '],
            ['ФОО. ', 'БАР.'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});

describe('leftPairsTailAbbreviation', () => {
    it('evaluates to true if left is tail of the pair abbreviation', () => {
        const go = compose(reduce(and, true), map(leftPairsTailAbbreviation));
        const generateInput = compose(
            unnest,
            juxt([keysUpperWithRightUpper, keysSpacesWithRightLower]),
            keys,
        );
        const input = [
            ...generateInput(HEAD_PAIR),
            ...generateInput(TAIL_PAIR),
            ...generateInput(OTHER_PAIR),
        ];
        const expected = true;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
    it('evaluates to false otherwise', () => {
        const go = compose(reduce(or, false), map(leftPairsTailAbbreviation));
        const input = [
            ['фоо.бар. ', 'амбар'],
            ['not.an.abbr.', ' not happening'],
            ['not. an. abbr.', ' not happening'],
        ];
        const expected = false;
        const actual = go(input);
        expect(actual).toBe(expected);
    });
});
