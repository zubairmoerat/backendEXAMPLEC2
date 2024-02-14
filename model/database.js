import mysql from 'mysql2'

import { config } from 'dotenv'
config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}).promise()

const getFriends = async()=>{
    const [result] = await pool.query(`
      SELECT * FROM users
    `)
    return result
}

const getFriend = async(id)=>{
    const [result] = await pool.query(`
      SELECT * FROM users WHERE id = ?
    `, [id])
    return result
}

const addFriend = async(Names, Age)=>{
    const [friend] = await pool.query(`
      INSERT INTO users (Names , Age) VALUES (? , ?)
    `,[Names, Age])
    return getFriend(friend.insertId)
}

const editFriend = async(id, Names, Age)=>{
    const [friend] = await pool.query(`
      UPDATE users SET Name = ?, Age = ? WHERE (id = ?)
    `, [id,Names,Age])
    return getFriends(friend)
}

const deleteFriend = async (id)=>{
    const [friend] = await pool.query( `
      DELETE FROM users WHERE id = ?
    `, [id])
    return getFriends(friend)
}

export{getFriends, getFriend, addFriend, deleteFriend, editFriend}