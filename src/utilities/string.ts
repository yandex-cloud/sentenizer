import {compose, invoker, juxt, allPass, identity, not, toLower, toUpper, Pred} from 'ramda';

import {allEqual} from './list';

const charAt = invoker(1, 'charAt');

const notAlpha = compose(allEqual, juxt([toLower, toUpper]));

const hasAlpha = compose(not, notAlpha);

const startsWithLower = allPass([
    compose(compose(not, notAlpha), charAt(0)) as Pred<any[]>,
    compose(allEqual, juxt([identity, toLower]), charAt(0)) as Pred<any[]>,
]);

const isUpper = compose(allEqual, juxt([toUpper, identity]));

export {charAt, notAlpha, hasAlpha, startsWithLower, isUpper};
