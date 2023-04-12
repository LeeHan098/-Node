import MongoDB from "mongodb";
import Mongoose from 'mongoose'
import { config } from '../config.js';

export async function connectDB() {
    return Mongoose.connect(config.db.host)
}

export function useVirtualId(schema){
    //_id => id 저장은 _id 읽을땐 id
schema.virtual('id').get(function(){
    return this._id.toString()
  });
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true})
}

// TODO: DELETE

let db;
// atlas에 collection 만들기

export function getTweets(){
    return db.collection('tweets')
}