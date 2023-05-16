import initDB from '../utils/db.js'

async function testDB () {
  const db = await initDB()
  const res1 = await db.run("SELECT * from user;")
  console.log(res1)
  const res2 = await db.exec("SELECT * from user;")
  console.log(res2)

}

testDB()