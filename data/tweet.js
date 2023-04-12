import * as userRepository from './auth.js';
import { sequelize } from '../db/database.js'
import SQ, { STRING, Sequelize, TEXT } from 'sequelize'
import { User } from './auth.js'

const DataTypes = SQ.DataTypes
const se = SQ.Sequelize
const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})
Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [se.col('user.name'), 'name'],
    [se.col('user.username'), 'username'],
    [se.col('user.url'), 'url']
  ],
  include: {
    model: User,
    attributes: []
  }
}
const ORDER = { order: [['createdAt', 'DESC']] }

export async function getAll() {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER
  })
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER, ...ORDER, include: {
      ...INCLUDE_USER.include, where: { username }
    }
  })
}

export async function getById(id) {
  console.log(id)
  return Tweet.findOne({where:{id},...INCLUDE_USER})
}

export async function create(text, userId) {
  return Tweet.create({ text, userId })
    .then((data) => { this.getById(data.dataValues.id) })
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER)
  .then(tweet => {
    tweet.text =text;
    return tweet.save()
  })
}

export async function remove(id) {
  return Tweet.findByPk(id)
  .then(tweet => {
    tweet.destroy();
  })
}
