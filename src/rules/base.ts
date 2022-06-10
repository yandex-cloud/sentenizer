import {call, zipWith, compose, map, all, not, always} from 'ramda';

import {startsWithLower, lengthNonZero} from '../utilities';
import {
    fstToken,
    words,
    spacePrefix,
    spaceSuffix,
    quotationGenericPrefix,
    quotationClosePrefix,
    bracketsClosePrefix,
    delimiterPrefix,
    spaces,
} from '../parsers';

const isSpaceSuffix = compose(lengthNonZero, spaceSuffix);
const isSpacePrefix = compose(lengthNonZero, spacePrefix);

// determine if delimiter surronded by spaces on both sides
const spaceBothSides = compose(
    all(Boolean),
    zipWith<any, any, any>(call, [isSpaceSuffix, isSpacePrefix]),
    map(words),
);

// determine if right of delimiter lacks space prefix
const rightLacksSpacePrefix = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(not, isSpacePrefix)]),
    map(words),
);

// determine if right starts with lower case
const rightStartsWithLowercase = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(startsWithLower, fstToken)]),
);

// todo: determine if right is a delimiter
const rightDelimiterPrefix = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(lengthNonZero, delimiterPrefix, fstToken)]),
);

// determine if right is a generic quotation mark
const rightQuotationGenericPrefix = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(lengthNonZero, quotationGenericPrefix)]),
);

// determine if right is a close quotation mark
const rightQuotationClosePrefix = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(lengthNonZero, quotationClosePrefix, fstToken)]),
);

// determine if right is a close bracket
const rightBracketsClosePrefix = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(lengthNonZero, bracketsClosePrefix, fstToken)]),
);

// determine if right consists of only spaces
const rightOnlySpaces = compose(
    all(Boolean),
    zipWith(call, [always(true), compose(lengthNonZero, spaces)]),
);

export {
    spaceBothSides,
    rightLacksSpacePrefix,
    rightStartsWithLowercase,
    rightDelimiterPrefix,
    rightQuotationGenericPrefix,
    rightQuotationClosePrefix,
    rightBracketsClosePrefix,
    rightOnlySpaces,
};
