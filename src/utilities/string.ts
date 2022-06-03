import {compose, invoker, juxt, allPass, identity, not, toLower, toUpper} from 'ramda';

import {allEqual} from './list';

const charAt = invoker(1, 'charAt');

const notAlpha = compose(allEqual, juxt([toLower, toUpper]));

const hasAlpha = compose(not, notAlpha);

const startsWithLower = allPass([
    compose(compose(not, notAlpha), charAt(0)),
    compose(allEqual, juxt([identity, toLower]), charAt(0)),
]);

export {charAt, notAlpha, hasAlpha, startsWithLower};
