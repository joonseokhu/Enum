const Enum = require('../')

const Foo = Enum('dd', 'fff');

const json = JSON.stringify({
  type: Foo.dd,
})

const keys = Object.keys(Foo)

const compare = Foo().compare(Foo.dd, Foo.dd)

// const equal = Foo.dd.isEqual(Foo('dd'))

console.log({
  json,
  keys,
  Foo: Foo.toString(),
  compare,
});