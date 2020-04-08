class Enum {
  constructor(...enums) {
    const SanitizedEnums = [...(new Set(enums))];
    if (SanitizedEnums.length !== enums.length) {
      throw new Error('Enums have to be unique strings')
    }
    
    for (let i = 0; i < enums.length; i ++) {
      const e = enums[i];
      if (typeof e !== 'string') {
        throw new Error('Enums have to be strings')
      }
      if (!e.length) {
        throw new Error('Enums have to be longer than 0')
      }
      const result = {
        [Symbol(e)]: e,
        toString: () => e,
      }
      this[e] = result;
    }
    Object.freeze(this);
  }
}
