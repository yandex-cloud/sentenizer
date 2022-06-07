import {
    or,
    view,
    join,
    __,
    compose,
    zipWith,
    call,
    prop,
    defaultTo,
    allPass,
    anyPass,
    toLower,
} from 'ramda';

import {
    INITIALS,
    HEAD,
    TAIL,
    OTHER,
    HEAD_PAIR,
    TAIL_PAIR,
    OTHER_PAIR,
} from '../constants/abbreviations';
import {lengthNonZero, startsWithLower, isUpper} from '../utilities';
import {dotSuffix, lstWord, fstWord, words, lstToken, fstToken} from '../parsers';
import {first, second} from '../lenses';

const fst = compose(defaultTo(''), view(first<string>()));
const snd = compose(defaultTo(''), view(second<string>()));

// ends in a dot
const isDotDelimiter = compose(lengthNonZero, dotSuffix);

// sides tuple into map key
const hash = compose(toLower, join('.'));

// pair abbreviations join
const insidePairAbbreviationMap = anyPass([
    prop(__, HEAD_PAIR),
    prop(__, TAIL_PAIR),
    prop(__, OTHER_PAIR),
]);

// abbreviation pair test
const isPairAbbreviation = compose(
    insidePairAbbreviationMap,
    hash,
    zipWith(call, [compose(lstWord, lstToken), compose(fstWord, fstToken)]),
);

// pair abbreviation conditions:
//     * separated by dot
//     * hashed words from adjacent sides are known abbreviation pairs
const pairAbbreviation = allPass([compose(isDotDelimiter, lstToken, fst), isPairAbbreviation]);

// tail abbreviation join
const insideAbbreviationMap = anyPass([
    prop(__, INITIALS),
    prop(__, HEAD),
    prop(__, TAIL),
    prop(__, OTHER),
]);

// tail abbreviation test
const isLeftAbbreviation = compose(insideAbbreviationMap, toLower, lstWord, lstToken);

// left abbreviation conditions:
//     * delimiter is dot
//     * lefts side right most word is known abbreviation
const leftAbbreviation = compose(
    allPass([compose(isDotDelimiter, lstToken), isLeftAbbreviation]),
    fst,
);

// right join condition is to be uppercase or lowercase word
const rightLowercaseOrCaps = compose(anyPass([startsWithLower, isUpper]), fstWord, snd);

// portion of the source <s> before target <t>
const before = (s: string) => (t: string) => s.slice(0, Math.max(s.indexOf(t), 0));

// does left contain pair abbreviation
const isLeftPairsTail = (left) => {
    const rest = before(left);

    const head = compose(words, lstWord, rest, lstWord, lstToken);

    return or(
        isPairAbbreviation([head(left), lstWord(left)]),
        isPairAbbreviation(lstWord(left).split('.')),
    );
};

// conditions:
//     * delimiter is dot
//     * we split at the tail of the pair abbreviation
//     * right word starts with lowercase or entirely in uppercase
const leftPairsTailAbbreviation = allPass([
    compose(isDotDelimiter, lstToken, fst),
    compose(isLeftPairsTail, fst),
    rightLowercaseOrCaps,
]);

export {pairAbbreviation, leftAbbreviation, leftPairsTailAbbreviation};
