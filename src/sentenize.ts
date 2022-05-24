/* eslint-disable security/detect-non-literal-regexp */
import {SENTENCE_END_MARKERS} from './constants';

// (not sentence end marker(s) or nothing) followed by sentence end marker(s)
const sentencePattern = `([^${SENTENCE_END_MARKERS}]*?[${SENTENCE_END_MARKERS}]+)`;

const senteceFlags = 'gmu';

const sentenceRegExp = new RegExp(sentencePattern, senteceFlags);

const trimmer = (s: string): string => s.trim();

function sentences(text: string): string[] {
    return text.split(sentenceRegExp).filter(Boolean).map(trimmer);
}

function sentenize(text: string): string[] {
    return sentences(text);
}

export {sentenize};
