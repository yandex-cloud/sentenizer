/* eslint-disable @typescript-eslint/no-shadow */
import {compose, split, filter, not, equals} from 'ramda';

import {
    SENTENCE_END_MARKERS,
    BRACKETS_CLOSE,
    QUOTATION_GENERIC_MARKERS,
    QUOTATION_CLOSE_MARKERS,
} from '../src/constants';

import {
    fst,
    snd,
    sentences,
    words,
    delimiters,
    fstToken,
    fstWord,
    lstToken,
    lstWord,
    fstChars,
    lstChars,
    spacePrefix,
    spaceSuffix,
    quotationGenericPrefix,
    quotationClosePrefix,
    delimiterPrefix,
    bracketsClosePrefix,
} from '../src/parsers';

describe('fst', () => {
    it('should extract first string from string array', () => {
        const input = ['match-a', 'match-b'];
        const expected = 'match-a';
        const actual = fst(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string if array is empty', () => {
        const input = [];
        const expected = '';
        const actual = fst(input);
        expect(actual).toBe(expected);
    });
});

describe('snd', () => {
    it('should extract second string from string array', () => {
        const input = ['match-a', 'match-b'];
        const expected = 'match-b';
        const actual = snd(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string if array is empty', () => {
        const input = [];
        const expected = '';
        const actual = snd(input);
        expect(actual).toBe(expected);
    });
});

describe('sentences', () => {
    it('should split text on delimiter(s)', () => {
        const input = [
            'Предложение один.Предложение два.Предложение три.Предложение четыре.',
            'Предложение один?Предложение два?Предложение три?Предложение четыре?',
            'Предложение один!Предложение два!Предложение три!Предложение четыре!',
            'Предложение один…Предложение два…Предложение три…Предложение четыре…',
        ];
        const expected = [
            ['Предложение один.', 'Предложение два.', 'Предложение три.', 'Предложение четыре.'],
            ['Предложение один?', 'Предложение два?', 'Предложение три?', 'Предложение четыре?'],
            ['Предложение один!', 'Предложение два!', 'Предложение три!', 'Предложение четыре!'],
            ['Предложение один…', 'Предложение два…', 'Предложение три…', 'Предложение четыре…'],
        ];
        for (let i = 0; i < input.length; i++) {
            const actual = sentences(input[i]);
            expect(actual).toStrictEqual(expected[i]);
        }
    });
    it('should default to array of single element of original text in case of one sentence', () => {
        const input = 'Одно длинное предложение без разделителя';
        const expected = ['Одно длинное предложение без разделителя'];
        const actual = sentences(input);
        expect(actual).toStrictEqual(expected);
    });
    it('should default to empty array on empty string', () => {
        const input = '';
        const expected = [];
        const actual = sentences(input);
        expect(actual).toStrictEqual(expected);
    });
});

describe('words', () => {
    it('should extract words from sentence and drop trailling delimiter(s)', () => {
        const input = 'Предложение о чем-то интересном?!';
        const expected = 'Предложение о чем-то интересном';
        const actual = words(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = '?!';
        const expected = '';
        const actual = words(input);

        expect(actual).toBe(expected);
    });
});

describe('delimiters', () => {
    it('should extract trailling delimiter(s) from sentence', () => {
        const _delimiters = split('')(SENTENCE_END_MARKERS);
        for (const delimiter of _delimiters) {
            const input = 'Sentence about something' + delimiter;
            const actual = delimiters(input);
            expect(actual).toBe(delimiter);
        }
    });
    it('should default to empty string', () => {
        const input = 'Предложение о чем-то интересном';
        const expected = '';
        const actual = delimiters(input);
        expect(actual).toBe(expected);
    });
});

describe('fstToken', () => {
    it('should extract first token in text including delimiter(s)', () => {
        const input = 'часть. предложения.';
        const expected = 'часть.';
        const actual = fstToken(input);
        expect(actual).toBe(expected);
    });
    it('should extract first token in text excluding space(s)', () => {
        const input = '   пробел. продолжение.';
        const expected = 'пробел.';
        const actual = fstToken(input);
        expect(actual).toBe(expected);
    });
    it('should extract whole text if it consist of a single token', () => {
        const input = 'трывок.';
        const expected = 'трывок.';
        const actual = fstToken(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = '';
        const expected = '';
        const actual = fstToken(input);
        expect(actual).toBe(expected);
    });
});

describe('fstWord', () => {
    it('should extract first word from text, excluding delimiter(s)', () => {
        const input = 'Конец.';
        const expected = 'Конец';
        const actual = fstWord(input);
        expect(actual).toBe(expected);
    });
    it('should extract whole text if it consist of a single word', () => {
        const input = 'Слово';
        const expected = 'Слово';
        const actual = fstWord(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = '...';
        const expected = '';
        const actual = fstWord(input);

        expect(actual).toBe(expected);
    });
});

describe('lstToken', () => {
    it('should extract last token from text including delimiter(s)', () => {
        const input = 'Это была Правда?! Правда!!!';
        const expected = 'Правда!!!';
        const actual = lstToken(input);

        expect(actual).toBe(expected);
    });
    it('should extract last token from text excluding space(s)', () => {
        const input = 'Это была Правда?! Правда!!!    ';
        const expected = 'Правда!!!';
        const actual = lstToken(input);

        expect(actual).toBe(expected);
    });
    it('should extract whole text if it consists of a single token', () => {
        const input = 'Слово.';
        const expected = 'Слово.';
        const actual = lstToken(input);

        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = '    ';
        const expected = '';
        const actual = lstToken(input);
        expect(actual).toBe(expected);
    });
});

describe('lstWord', () => {
    it('should extract last word from text, excluding delimiter(s)', () => {
        const input = 'Начало предложения...';
        const expected = 'предложения';
        const actual = lstWord(input);
        expect(actual).toBe(expected);
    });
    it('should extract whole text if it consist of a single word', () => {
        const input = 'Слово...';
        const expected = 'Слово';
        const actual = lstWord(input);
        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = '...';
        const expected = '';
        const actual = lstWord(input);

        expect(actual).toBe(expected);
    });
});

describe('fstChars', () => {
    it('should extract first <N> chars from text', () => {
        const parser = fstChars(4);
        const input = 'Отрывок';
        const expected = 'Отры';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
    it('should extract first 10 chars from text by default', () => {
        const parser = fstChars();
        const input = '1234567890 продолжение';
        const expected = '1234567890';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
    it('should extract all characters if chars amount less than provided window width', () => {
        const parser = fstChars();
        const input = '12345';
        const expected = '12345';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
});

describe('lstChars', () => {
    it('should extract last <N> chars from text', () => {
        const parser = lstChars(4);
        const input = 'Отрывок';
        const expected = 'ывок';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
    it('should extract last 10 chars from text by default', () => {
        const parser = lstChars();
        const input = '1234567890 продолжение';
        const expected = 'родолжение';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
    it('should extract all characters if characters amount less than provided window width', () => {
        const parser = lstChars();
        const input = '12345';
        const expected = '12345';
        const actual = parser(input);

        expect(actual).toBe(expected);
    });
});

describe('spacePrefix', () => {
    it('should extract space preffix', () => {
        const input = ' Предложение о чем-то интересном.';
        const expected = ' ';
        const actual = spacePrefix(input);

        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = 'Предложение о чем-то интересном.';
        const expected = '';
        const actual = spacePrefix(input);

        expect(actual).toBe(expected);
    });
});

describe('spaceSuffix', () => {
    it('should extract space suffix', () => {
        const input = 'Предложение с пробелами в конце.    ';
        const expected = ' ';
        const actual = spaceSuffix(input);

        expect(actual).toBe(expected);
    });
    it('should default to empty string', () => {
        const input = 'Предложение без пробелов в конце.';
        const expected = '';
        const actual = spaceSuffix(input);

        expect(actual).toBe(expected);
    });
});

describe('quotationGenericPrefix', () => {
    it('should extract generic quotation mark prefix', () => {
        const quotations = split('')(QUOTATION_GENERIC_MARKERS);
        for (const quotation of quotations) {
            const input = quotation + ' Another sentence';
            const actual = quotationGenericPrefix(input);
            expect(actual).toBe(quotation);
        }
    });
    it('should default to empty string', () => {
        const input = ' Another sentence.';
        const expected = '';
        const actual = quotationGenericPrefix(input);
        expect(actual).toBe(expected);
    });
});

describe('quotationClosePrefix', () => {
    it('should extract close quotation mark prefix', () => {
        const quotations = split('')(QUOTATION_CLOSE_MARKERS);
        for (const quotation of quotations) {
            const input = quotation + ' Another sentence';
            const actual = quotationClosePrefix(input);
            expect(actual).toBe(quotation);
        }
    });
    it('should default to empty string', () => {
        const input = ' Another sentence';
        const expected = '';
        const actual = quotationClosePrefix(input);
        expect(actual).toBe(expected);
    });
});

describe('delimiterPrefix', () => {
    it('should extract delimiter prefix', () => {
        const delimiters = split('')(SENTENCE_END_MARKERS);
        for (const delimiter of delimiters) {
            const input = delimiter + ' Another sentence';
            const actual = delimiterPrefix(input);
            expect(actual).toBe(delimiter);
        }
    });
    it('should default to empty string', () => {
        const input = 'Another sentence.';
        const expected = '';
        const actual = delimiterPrefix(input);
        expect(actual).toBe(expected);
    });
});

describe('bracketsClosePrefix', () => {
    it('should extract close bracket prefix', () => {
        const brackets = compose(filter(compose(not, equals('\\'))), split(''))(BRACKETS_CLOSE);
        for (const bracket of brackets) {
            const input = bracket + ' Another sentence';
            const actual = bracketsClosePrefix(input);
            expect(actual).toBe(bracket);
        }
    });
    it('should default to empty string', () => {
        const input = ' Another sentence';
        const expected = '';
        const actual = bracketsClosePrefix(input);
        expect(actual).toBe(expected);
    });
});
