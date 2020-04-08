# Enum
A Polyfill to use Enum in JavaScript

## How to use this
```js
const sample = new Enum('north', 'south', 'west', 'east')
```

- Each argument has to be string which has more than 0 character.
- Each argument has to be unique to each other.

## Comparison

- Each enum value is treated as to be unique

```js
sample.north === sample.north // true
sample.south == sample.west // false
sample.east == 'east' // false
```

- Each enum value can be converted to string

```js
sample.north + '' // 'north'
```

- Enum values cannot be mutated

```js
const foo = Object.assign(sample.west, { value: 'foo' })
// TypeError: Cannot assign to read only property 'value' of object '[object Object]'
```
