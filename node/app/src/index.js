const express = require('express')
const app = express()
const axios = require('axios')
const mysql = require('mysql');

const port = 3000

const config = {
  host: 'challenge-node-db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

async function getConnection () {
  return mysql.createConnection(config)
}

async function createTable () {
  const conn = await getConnection()
  const query = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255) not null, primary key (id))`
  await conn.query(query)
  conn.end()
}

const getFakeName = async () => {
  try {
    return await axios.get('https://api.namefake.com/')
  } catch (error) {
    console.error(error)
  }
}

async function insertFakeName () {
  await getFakeName().then(async response => {
    const conn = await getConnection()
    const query = `INSERT INTO people(name) values('${response.data.name}')`
    await conn.query(query)
    conn.end()
  })
}

function getNames () {
  return  new Promise(async (resolve, reject) => {
    const conn = await getConnection()
    const query = 'SELECT * FROM people;'
    await conn.query(query, function (err, rows, fields) {
      if (err) {
        reject(err);
        return;
      }
      conn.end()
      const names = rows.map((row) => row.name)
      resolve(names)
    })
  })
}

async function formatNamesInList(names){
  let namesInList = ''
  names.forEach(name => {
    console.log(name)
    namesInList = namesInList.concat('<li>' + name + '</li>')
  });
  return namesInList
}

async function setup() {
  await createTable()
  await insertFakeName()
}

setup()

app.get('/', async (req, res) => {
  let content = '<h1>Full Cycle Rocks!</h1><br/><br/>'
  createTable().then(() =>insertFakeName().then(async () => {
    const names = await getNames().then((names) => {return names})
    let formattedNames = ''
    formattedNames = await formatNamesInList(names)
    content = content.concat('<ol>').concat(formattedNames).concat('<ol/>')
    res.send(content)
  }))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})