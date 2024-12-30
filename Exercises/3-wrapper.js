'use strict';

const contract = (fn, ...types) => (...args) => {
  if (args.length !== types.length - 1) {
    throw new TypeError('Argument count mismatch');
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const def = types[i];
    const name = def.name.toLowerCase();
    if (typeof arg !== name) {
      throw new TypeError(`Argument ${i} type ${name} expected`);
    }
  }

  const res = fn(...args);
  const def = types[types.length - 1];
  const name = def.name.toLowerCase();
  if (typeof res !== name) {
    throw new TypeError(`Result type ${name} expected`);
  }

  return res;
};


module.exports = { contract };
