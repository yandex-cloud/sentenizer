import {compose, curry, flip, lte, uniq, length} from 'ramda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lenLte = (len) => compose<any[][], number, boolean>(curry(flip(lte))(len), length);

const allEqual = compose(lenLte(1), uniq);

const lengthNonZero = compose(Boolean, length);

export {lenLte, allEqual, lengthNonZero};
