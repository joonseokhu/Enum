const CreateEnum = (...enums) => {
  const ret = {}
  const elements = enums.map((name, index) => {
    if (typeof name !== 'string') throw new Error('Invalid enum name: has to be string');
    if (!name.length) throw new Error('Invalid enum name: has to be more than 1 length');
    if (Object.keys(Function.prototype).includes(name)) throw new Error('Invalid enum name: cannot be a name of Function methods');

    return Object.freeze({
      name,
      index,
      toString: () => name,
      valueOf: () => name,
    });
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

  const findElement = accessor => {
    const keyTypes = {string: 'name', number: 'index'}
    const key = keyTypes[typeof accessor];
    if (!key) throw new Error('Invalid type to find');
    const result = elements.filter(element => (element[key] === accessor));
    if (!result.length) throw new Error('Not Found');
    return result[0];
  };
  
  const EnumstoString = () => `Enum: [${elements.map(({ name }) => name).join(', ')}]`

  return Object.freeze(
    Object.assign(findElement, {
      ret,
      toString: EnumstoString,
      ...accessorsOfElements,
    })
  );
};

const Enum = Object.assign(CreateEnum, {
  // getNamesOfEnum: string[];
});

const Sample = Enum('north', 'south', 'east', 'west')

Sample.east === Sample('east');
Sample.east === Sample(2);
Sample(2) === Sample('east');

