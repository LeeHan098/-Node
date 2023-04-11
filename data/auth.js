import { db } from '../db/database.js';

// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
// let users = [
//   {
//     id: '1',
//     username: 'bob',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name: 'Bob',
//     email: 'bob@gmail.com',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: '2',
//     username: 'ellie',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name: 'Ellie',
//     email: 'ellie@gmail.com',
//   },
// ];

export async function findByUsername(username) {
  return db.execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0] )
}

export async function findById(id) {
  return db.execute('SELECT * FROM users WHERE id=?', [id])
  .then((result) => result[0][0] )
}

export async function createUser(user) {
  const { username, password, name, email, url } = user
  return db.execute('INSERT INTO users (username, password, name, email, url) VALUES(?,?,?,?,?)', [
    username, password, name, email, url
  ]).then((result) => { console.log(result[0].insertId); return result })
}
