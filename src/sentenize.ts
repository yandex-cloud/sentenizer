/* eslint-disable security/detect-non-literal-regexp, security/detect-unsafe-regex, prefer-spread, @typescript-eslint/no-shadow */
import {compose, map, trim, anyPass, zipWith, call} from 'ramda';

import {sentences, fstChars, lstChars} from './parsers';
import {
    spaceBothSides,
    rightLacksSpacePrefix,
    rightStartsWithLowercase,
    rightDelimiterPrefix,
    rightQuotationGenericPrefix,
    rightQuotationClosePrefix,
    rightBracketsClosePrefix,
    rightOnlySpaces,
    leftInitials,
    leftAbbreviation,
    pairAbbreviation,
    leftPairsTailAbbreviation,
} from './rules';

// sides preprocessing before evaluation
const leftPreprocessor = lstChars(20);
const rightPreprocessor = fstChars(20);
const sidesPreprocessors = [leftPreprocessor, rightPreprocessor];

// conditions to join upon
const joinCondition = anyPass([
    spaceBothSides,
    rightLacksSpacePrefix,
    rightStartsWithLowercase,
    rightDelimiterPrefix,
    rightQuotationGenericPrefix,
    rightQuotationClosePrefix,
    rightBracketsClosePrefix,
    rightOnlySpaces,
    leftInitials,
    leftAbbreviation,
    pairAbbreviation,
    leftPairsTailAbbreviation,
]);

const join = compose(joinCondition, zipWith(call, sidesPreprocessors));

// sentences processing
function processor(
    splits: string[],
    sentences: string[] = new Array<string>(),
    left = '',
    i = 0,
): string[] {
    if (!splits[i]) {
        return left ? [...sentences, left] : sentences;
    }

    if (!left) return processor(splits, sentences, splits[i], i + 1);

    const parameters = join([left, splits[i]])
        ? [splits, sentences, left + splits[i], i + 1]
        : [splits, [...sentences, left], splits[i], i + 1];

    return processor.apply(null, parameters);
}

// sentences postprocessing
// todo: (l|r)trim spaces into (l|r)trim non alpha
const postprocessor = map(trim);

const sentenize = compose(postprocessor, processor, sentences);

export {sentenize};
