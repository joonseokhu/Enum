import SYM from './symbol';

const CreateEnum = (...enums) => {
  const elements = enums.map((name, index) => {
    if (typeof name !== 'string') throw new Error('Invalid enum name: has to be string');
    if (!name.length) throw new Error('Invalid enum name: has to be more than 1 length');
    if (Object.keys(Function.prototype).includes(name)) throw new Error('Invalid enum name: cannot be a name of Function methods');
    
    const ret = {};
    const toString = () => name;
    const valueOf = () => name;
    const toInt = () => index;
    const isEqual = enumElement => (enumElement === ret);

    return Object.freeze(Object.assign(ret, {
      name,
      index,
      valueOf,
      toString,
      toInt,
      isEqual,
    }));
  });

  const IsEachEnumUnique = (() => {
    const uniqueElements = [...(new Set(elements))];
    return elements.length === uniqueElements.length;
  })();

  if (!IsEachEnumUnique) {
    throw new Error('Enums have to be unique strings');
  }

  const accessorsOfElements = elements.reduce((acc, element) => {
    const name = element.name;
    const index = element.index;
    return {...acc, [name]: element, [index]: element}
  }, {});
  
  const EnumstoString = () => `Enum: [${elements.map(({ name }) => name).join(', ')}]`

  const has = element => elements.filter(el => el === element).length === 1;

  const compare = (left, right) => (has(left) && has(right) && left === right);

  const entries = () => elements.map(({ name, index }) => [name, index]);

  const utils = Object.freeze({
    has,
    entries,
    compare,
    elements,
  });

  const findElement = accessor => {
    if (accessor === undefined) return utils;
    const keyTypes = {string: 'name', number: 'index'}
    const key = keyTypes[typeof accessor];
    if (!key) throw new Error('Invalid type to find');
    const result = elements.filter(element => (element[key] === accessor));
    if (!result.length) throw new Error('Not Found');
    return result[0];
  };
  
  return Object.freeze(
    Object.assign(findElement, {
      toString: EnumstoString,
      ...accessorsOfElements,
    })
  );
};

export default CreateEnum;