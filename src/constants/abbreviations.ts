type StrBoolMap = {[key: string]: boolean};

// prettier-ignore
const INITIALS: StrBoolMap = {
    'дж': true,
    'ed': true,
    'эд': true,
    'вс': true,
    'md': true,
    'мд': true,
};

// prettier-ignore
const HEAD: StrBoolMap = {
    'букв': true,  // яп. 18禁, букв. «запрещено
    'ст': true,  // ст.-слав.
    'трад': true,  // кит. трад
    'лат': true,
    'венг': true,
    'исп': true,
    'кат': true,
    'укр': true,
    'нем': true,
    'англ': true,
    'фр': true,
    'итал': true,
    'греч': true,
    'евр': true,
    'араб': true,
    'яп': true,
    'слав': true,
    'кит': true,
    'рус': true,
    'русск': true,
    'латв': true,
    'словацк': true,
    'хорв': true,
    'mr': true,
    'mrs': true,
    'ms': true,
    'dr': true,
    'vs': true,
    'св': true,  // св.Иоанна
    'арх': true,
    'зав': true,
    'зам': true,
    'проф': true,
    'акад': true,
    'кн': true,  // кандидат наук
    'корр': true,  // сообщил корр. ИТАР-ТАСС
    'ред': true,  // Под ред. Линды Уильямс
    'гр': true,  // гр. Валевской
    'ср': true,  // Ср. L. Ross
    'чл': true,
    'им': true,  // им. Вс. Мейерхольда
    'тов': true,  // тюремном подвале тов. Берия
    'нач': true,
    'пол': true,  // нач. XX века
    'chap': true,
    'п': true,
    'пп': true,
    'ч': true,
    'чч': true,
    'гл': true,
    'абз': true,
    'пт': true,  // ст. 129 ч. 2 п. 8 Гл. VI
    'no': true,  // No. 6
    'просп': true,
    'пр': true,
    'ул': true,
    'ш': true,
    'г': true,
    'гор': true,
    'д': true,
    'стр': true,
    'к': true,
    'корп': true,
    'пер': true,
    'обл': true,
    'эт': true,
    'пом': true,
    'ауд': true,
    'оф': true,
    'ком': true,
    'комн': true,
    'каб': true,
    'домовлад': true,
    'лит': true,
    'т': true,  // т. 1 л.д. 85-89
    'рп': true,
    'пос': true,
    'с': true,
    'х': true,  // х. Ново-Максимовский, с. Кляшево рп.Раздолинск
    'пл': true,  // площадь
    'bd': true,  // Bd. 16, Berlin
    'о': true,
    'оз': true,  // Вблизи оз. Селяха
    'р': true,  // р. Иордан
    'а': true,  // а. Адыге-Хабль
    'обр': true,  // обр. 1936 г.
    'ум': true,  // ум. 1064
    'ок': true,  // "родилась ок. 1211", "работают ок. 150 специалистов"
    'откр': true,  // Откр. 20:40
    'пс': true,
    'ps': true,
    'upd': true,
    'см': true,
    'напр': true,  // UNIX-семейства, напр. Linux, FreeBSD
    'доп': true,
    'юр': true,
    'физ': true,  // юр. адрес
    'тел': true,
    'сб': true,  // Сб. «Киноварь»
    'внутр': true,  // к внутр. миру героев
    'дифф': true,  // мне по дифф. зачёту «5» поставил
    'гос': true,  // гос. экзамены
    'отм': true,  // от отм. 0.000
}

// prettier-ignore
const TAIL: StrBoolMap = {
    'дес': true,
    'тыс': true,
    'млн': true,
    'млрд': true,
    'дол': true,
    'долл': true,
    'коп': true,
    'руб': true,
    'р': true,
    'проц': true,  // 95 проц. акций,
    'га': true,
    'барр': true,  // 40 долларов за барр.
    'куб': true,  // 1000 куб. метр.
    'кв': true,
    'км': true,  // 700 тыс. кв. км.
    'см': true,  // 30 см
    'час': true,
    'мин': true,
    'сек': true,  // в 15 час. 13 мин. 53 сек.
    'в': true,
    'вв': true,  // XII в. XVIII—XIX вв.
    'г': true,
    'гг': true,  // 1996-1999гг
    'с': true,
    'стр': true,  // 287 стр.
    'co': true,
    'corp': true,
    'inc': true,
    'изд': true,
    'ed': true,  // 1-е изд. Arthur W. Hummel, ed. Eminent Chinese
    'др': true,  // и другие
    'al': true,  // North et al.
};

// prettier-ignore
const OTHER: StrBoolMap = {
    'сокр': true,
    'рис': true,
    'искл': true,
    'прим': true,
    'яз': true,
    'устар': true,  // пометкой "устар."
    'шутл': true,  // "в стиле шутл.", "bones — шутл. человек"
}

// prettier-ignore
const HEAD_PAIR = {
    'т.е': true,
    'т.к': true,
    'и.о': true,
    'к.н': true,
    'к.п': true,
    'п.н': true,  // к.п.н
    'к.т': true,
    'т.н': true,  // к.т.н
    'л.д': true,  // т. 1 л.д. 85-89
};

// prettier-ignore
const TAIL_PAIR = {
    'т.п': true,
    'ч.т': true,
    'т.д': true,  // ч.т.д
    'у.е': true,
    'н.э': true,
    'p.m': true,
    'a.m': true,
    'с.г': true,  // от 18 мая с. г.
    'р.х': true,  // 250 года до Р. Х.
    'с.ш': true,  // 50°13′ с. ш.
    'з.д': true,  // 12°48′ з. д.
    'л.с': true,
};

// prettier-ignore
const OTHER_PAIR = {
    'ед.ч': true,
    'мн.ч': true,
    'повел.накл': true,  // в 1 лице мн. ч. повел. накл.
    'жен.р': true,
    'муж.р': true,
}

export {INITIALS, HEAD, TAIL, OTHER, HEAD_PAIR, TAIL_PAIR, OTHER_PAIR};
