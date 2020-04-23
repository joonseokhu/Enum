# Enum
A Polyfill to use Enum in JavaScript

## How to use this
```js
const Direction = new Enum('north', 'south', 'west', 'east')
```

- Each argument has to be string which has more than 0 character.
- Each argument has to be unique to each other.

## Comparison

- Each enum value is treated as to be unique

```js
Direction.north === Direction('north') // true
Direction.north === Direction(0) // true
Direction.south == Direction.west // false
Direction.east == 'east' // false
```

## Stringify

- Each enum value can be converted to string

```js
Direction.north + '' // 'north'
```

- Enum values can be converted to JSON also.
```js
JSON.stringify({
  direction: Direction.north,
})
// === '{"direction":{"name":"north","index":0}}'

JSON.stringify({
  direction: String(Direction.north),
})
// === '{"direction":"north"}'
```

- Enum values cannot be mutated

```js
const MyDirection = Object.assign(Direction.west, { northwest: 'northwest' })
// TypeError: Cannot assign to read only property 'value' of object '[object Object]'
```

## Utilities

- You can check whether a value is a valid enum element

```js
const Direction = new Enum('north', 'south', 'west', 'east')
const UserTypes = new Enum('owner', 'admin', 'user')

Directions().has(Direction.south) // true
Directions().has(UserTypes.owner) // false
```

- You can also compare enum values by methods

```js
const Direction = new Enum('north', 'south', 'west', 'east')
Directions().compare(Direction.west, Direction.west) // true
Directions().compare(Direction.west, Direction.east) // false
Directions().compare(Direction.west, Direction.northwest) // false
Directions().compare(Direction.west, 'west') // false
```

- You can also compare enum values like this

```js
const Direction = new Enum('north', 'south', 'west', 'east')
const UserTypes = new Enum('owner', 'admin', 'user')

Direction('east').isEqual(Direction.east) // true
Direction.east.isEqual(Direction('east')) // true
Direction('east').isEqual(UserTypes.admin) // false
Direction('east').isEqual(Direction('west')) // false
Direction('east').isEqual('east') // false
```

## License

MIT.