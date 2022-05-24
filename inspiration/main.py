# coding=utf8
import functools
import itertools

#from razdel.sentenize import sentenize
# from razdel import sentenize
import razdel.sentenize as razdel
from deeppavlov import ru_sent_tokenize

def flatten(nested):
    return list(itertools.chain(*nested))

def compose(*functions):
    def compose2(f, g):
        return lambda x: f(g(x))
    return functools.reduce(compose2, functions, lambda x: x)

paragraphs = [
'Заказ из Яндекс.Лавки был успешно доставлен. Совсем другое предложение будет здесь.',
'Предложение один А.С. Пушкин. Предложение два.',
'Верхний\^регистр^',
'ага, т. е. ты имел ввиду это?',
'Предложение один. Предложение два? Предложение три! Предложение четыре.',
'раз\?два',
'ага, т. е. ты имел ввиду это?',
'Предложение один. Предложение два? Предложение три! Предложение четыре.',
'Заказал Еду из Яндекс.Лавки. Как писал великий классик А. C. Пушкин-с: "ТЬМЫ НИЗКИХ ИСТИН МНЕ ДОРОЖЕ НАС ВОЗВЫШАЮЩИЙ ОБМАН."',
'Есть такой классный сервис как {{ service-name }} попробуй еще захочешь',
'Это будет первый предложением в которое не попадёт дальше идущая переменная. {{ variable-name }} второе предложение к которому относится переменная.',
'is simply dummy text of the printing and typesetting industry.\
 Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,\
when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
]

"""
'раз\?два',
'ага, т. е. ты имел ввиду это?',
'Предложение один. Предложение два? Предложение три! Предложение четыре.',
'Заказал Еду из Яндекс.Лавки. Как писал великий классик А. C. Пушкин-с: "ТЬМЫ НИЗКИХ ИСТИН МНЕ ДОРОЖЕ НАС ВОЗВЫШАЮЩИЙ ОБМАН."',
'Есть такой классный сервис как {{ service-name }} попробуй еще захочешь',
'Это будет первый предложением в которое не попадёт дальше идущая переменная. {{ variable-name }} второе предложение к которому относится переменная.',
"""

razdel = map(compose(list, razdel.sentenize), paragraphs)

deeppavlov = map(compose(list, ru_sent_tokenize), paragraphs)

print('razdel:', list(map(lambda x: x.text, flatten(razdel))))

print('deeppavlov:', list(flatten(deeppavlov)))

'''
[
[Substring(0, 17, 'Верхний\\^регистр^')],
[Substring(0, 8, 'раз\\?два')],
[Substring(0, 29, 'ага, т. е. ты имел ввиду это?')],
[
    Substring(0, 17, 'Предложение один.'),
    Substring(18, 34, 'Предложение два?'),
    Substring(35, 51, 'Предложение три!'),
    Substring(52, 71, 'Предложение четыре.')
],
[
    Substring(0, 28, 'Заказал Еду из Яндекс.Лавки.'),
    Substring(29, 124, 'Как писал великий классик А. C. Пушкин-с: "ТЬМЫ НИЗКИХ ИСТИН МНЕ ДОРОЖЕ НАС ВОЗВЫШАЮЩИЙ ОБМАН."')
],
[Substring(0, 71, 'Есть такой классный сервис как {{ service-name }} попробуй еще захочешь')],
[
    Substring(0, 76, 'Это будет первый предложением в которое не попадёт дальше идущая переменная.'),
    Substring(77, 148, '{{ variable-name }} второе предложение к которому относится переменная.')
]]
'''
