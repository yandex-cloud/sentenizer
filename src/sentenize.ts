/* eslint-disable security/detect-non-literal-regexp, security/detect-unsafe-regex */
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
// todo: think about better way to express this logic
function processor(text: string): string[] {
    const chunks = sentences(text);

    let left;
    const parsed = [];

    for (let i = 0; i < chunks.length; i++) {
        if (!left) {
            left = chunks[i];

            continue;
        }

        // where chunks[i] is the "right" merge candidate
        if (join([left, chunks[i]])) {
            left += chunks[i];
        } else {
            parsed.push(left);

            left = chunks[i];
        }
    }

    if (left) parsed.push(left);

    return parsed;
}

// sentences postprocessing
// todo: (l|r)trim spaces into (l|r)trim non alpha
const postprocessor = map(trim);

const sentenize = compose(postprocessor, processor);

export {sentenize};
