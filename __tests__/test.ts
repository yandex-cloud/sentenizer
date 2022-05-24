import {sentenize} from '../src';

const info = (input, output, expected) => JSON.stringify({input, output, expected}, null, 4);

describe('sentenize naive', function () {
    it('should handle one basic sentence', () => {
        const paragraph = 'Последовательно обходим кандидатов на разделение, убираем лишние.';

        const expected = ['Последовательно обходим кандидатов на разделение, убираем лишние.'];

        const sentences = sentenize(paragraph);

        console.info(info(paragraph, sentences, expected));

        expect(sentences).toStrictEqual(expected);
    });

    it('should handle basic sentences that ends with .?!…;', () => {
        const paragraph =
            'Последовательно обходим кандидатов на разделение, убираем лишние. Используем список эвристик. Сколько гусей было у бабуси? Три Веселых гуся! Он задумчиво посмотрел в окно… И забыл про гусей. Предложение которое заканчивается семиколоной; Обычное Предложение после предложения с семиколоной.';

        const expected = [
            'Последовательно обходим кандидатов на разделение, убираем лишние.',
            'Используем список эвристик.',
            'Сколько гусей было у бабуси?',
            'Три Веселых гуся!',
            'Он задумчиво посмотрел в окно…',
            'И забыл про гусей.',
            'Предложение которое заканчивается семиколоной;',
            'Обычное Предложение после предложения с семиколоной.',
        ];

        const sentences = sentenize(paragraph);

        console.info(info(paragraph, sentences, expected));

        expect(sentences).toStrictEqual(expected);
    });

    it('should handle delimiter + new line broken sentences', () => {
        const paragraph =
            'Последовательно обходим кандидатов на разделение, убираем лишние. \
Используем список эвристик.';

        const expected = [
            'Последовательно обходим кандидатов на разделение, убираем лишние.',
            'Используем список эвристик.',
        ];

        const sentences = sentenize(paragraph);

        console.info(info(paragraph, sentences, expected));

        expect(sentences).toStrictEqual(expected);
    });
});
