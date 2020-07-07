const mysql = require('mysql')
require('dotenv').config()

const getDBConnection = (database) => {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: database
  })
}

const con = getDBConnection('idea_bucket')

const resObject = (key, rows) => {
	const obj = {}
	obj[key] = rows
	return obj
}

const query = (err, rows, endpoint, res, page, key) => {
    if (err) {
      console.log(`Failed to query for ${endpoint}: ${err}`)
      return []
    }
	if (!page) { return } 
	else if (page.includes('api')) { res.send(page, resObject(key, rows)) }
	else { res.render(page, resObject(key, rows)) }
}

const modify = (queryString, params, endpoint) => con.query(queryString, params, (err, results, field) => query(err, results, endpoint, null, null, null))

const select = (queryString, endpoint, res, page, key) => con.query(queryString, (err, rows, fields) => query(err, rows, endpoint, res, page, key))

const db = module.exports = {}

db.getIdeas = (res, page) => select('SELECT * FROM ideas', '/get_ideas', res, page, 'ideas')

db.getCategories = (res, page) => select( 'SELECT * FROM categories', 'get_categories', res, page, 'categories')

db.submitIdea = (params) => modify('INSERT INTO ideas (idea, category) VALUES (?, ?)', params, '/submitIdea')

db.submitCategory = (params) => modify('INSERT INTO categories (category) VALUES (?)', params, '/submitCategory')

db.deleteIdea = (params) => modify('DELETE from ideas WHERE ideas_id = ?', params, '/deleteIdea')
