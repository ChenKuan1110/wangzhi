import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { DB_DIR } from '../config/index.js'

console.log(DB_DIR)

async function initDB () {
  try {
    const db = await open({
      filename: DB_DIR,
      driver: sqlite3.Database
    })
    return db;
  } catch (e) {
    console.log("发生错误", e)
  }
}

export default initDB