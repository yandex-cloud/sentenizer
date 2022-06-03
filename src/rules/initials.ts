import {
    toUpper,
    identity,
    juxt,
    length,
    equals,
    allPass,
    compose,
    call,
    always,
    all,
    zipWith,
} from 'ramda';

import {hasAlpha, lengthNonZero, allEqual} from '../utilities';
import {dotSuffix, lstWord} from '../parsers';

// determine if left is part of the initials
// conditions:
//     * left delimiter is dot
//     * left last word is single letter
//     * left last word is in upper case
//     * left has alpha characters
const isLeftDotDelimiter = compose(lengthNonZero, dotSuffix);
const isLeftSingleLetter = compose(equals(1), length, lstWord);
const isLeftUpper = compose(allEqual, juxt([toUpper, identity]), lstWord);
const leftHasAlpha = compose(hasAlpha, lstWord);

const isLeftInitials = allPass([isLeftDotDelimiter, isLeftSingleLetter, isLeftUpper, leftHasAlpha]);

const leftInitials = compose(all(Boolean), zipWith(call, [isLeftInitials, always(true)]));

export {leftInitials};
