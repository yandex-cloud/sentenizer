import {sentenize} from '../src';

describe('sentenize naive', function () {
    it('should handle one basic sentence', () => {
        const input = 'Последовательно обходим кандидатов на разделение, убираем лишние.';
        const expected = ['Последовательно обходим кандидатов на разделение, убираем лишние.'];
        const actual = sentenize(input);
        expect(actual).toStrictEqual(expected);
    });
    it('should handle basic sentences that ends with .?!…;', () => {
        const input =
            'Последовательно обходим кандидатов на разделение, убираем лишние. Используем список эвристик. Сколько гусей было у бабуси? Три Веселых гуся! Он задумчиво посмотрел в окно… И забыл про гусей.';
        const expected = [
            'Последовательно обходим кандидатов на разделение, убираем лишние.',
            'Используем список эвристик.',
            'Сколько гусей было у бабуси?',
            'Три Веселых гуся!',
            'Он задумчиво посмотрел в окно…',
            'И забыл про гусей.',
        ];
        const actual = sentenize(input);
        expect(actual).toStrictEqual(expected);
    });
    it('should handle delimiter + new line broken sentences', () => {
        const input =
            'Последовательно обходим кандидатов на разделение, убираем лишние. \
Используем список эвристик.';
        const expected = [
            'Последовательно обходим кандидатов на разделение, убираем лишние.',
            'Используем список эвристик.',
        ];
        const actual = sentenize(input);
        expect(actual).toStrictEqual(expected);
    });
});
