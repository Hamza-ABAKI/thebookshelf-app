import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
    isAdmin: true,
  },
  {
    name: 'Hamza AB ',
    email: 'hamza@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
  },
  {
    name: 'Houssem GHZ',
    email: 'houssem@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
  },
  {
    name: 'Bilel M',
    email: 'bilel@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
  },
  {
    name: 'Sabrine H.S',
    email: 'sabrine@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
  },
  {
    name: 'Salim K',
    email: 'salim@email.com',
    password: bcrypt.hashSync('poiuyt', 10),
  },
]

export default users
