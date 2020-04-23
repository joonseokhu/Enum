const Enum = require('../')

const Direction = new Enum('north', 'south', 'west', 'east')
const UserTypes = new Enum('owner', 'admin', 'user')

const t1 = Direction('east').isEqual(Direction.east) // true
const t2 = Direction.east.isEqual(Direction('east')) // true

const t3 = Direction('east').isEqual(UserTypes.admin) // false

console.log({
  t1, t2, t3
})