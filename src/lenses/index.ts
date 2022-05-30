import {lensIndex} from 'ramda';

const first = <T>() => lensIndex<T>(0);

const second = <T>() => lensIndex<T>(1);

export {first, second};
