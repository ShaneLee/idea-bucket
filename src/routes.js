const express = require('express')
const mysql = require('mysql')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')

const dbConnection = getDBConnection('idea_bucket')

function getDBConnection(database) {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: database
  })
}

const checkLoggedIn = (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  }
}

router.get('/', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM categories'
  dbConnection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /: ' + err)
    }
    console.log('Getting data from database for /')
  res.render('index', { categories: rows })
  })
})

router.get('/login', (req, res) => {
    res.render('./pages/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
          if(info) {return res.send(info.message)}
          if (err) { return next(err) }
          if (!user) { return res.redirect('/login') }
          req.login(user, (err) => {
                  if (err) { return next(err); }
                  return res.redirect('/')
                })
        })(req, res, next)
})

router.get('/ideas', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM ideas'
  dbConnection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_ideas: ' + err)
    }
    console.log('Getting data from database for /get_ideas')
    res.render('./pages/ideas', { ideas: rows })
  })

})

router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})


router.post('/submit_idea', (req, res) => {
  checkLoggedIn(req, res)
  idea = req.body.idea
  category = req.body.category

  queryString = 'INSERT INTO ideas (idea, category) \
  VALUES (?, ?)'
  dbConnection.query(queryString, [idea, category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit idea. ' + err)
      return
    }
    console.log('Logged new idea ' + results)
  })
  res.redirect('/')
})

router.post('/submit_category', (req, res) => {
  checkLoggedIn(req, res)
  category = req.body.category

  queryString = 'INSERT INTO categories (category) \
  VALUES (?)'
  dbConnection.query(queryString, [category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit category. ' + err)
      return
    }
    console.log('Logged new category ' + results)
  })
  res.redirect('/')
})

router.post('/delete/:ideas_id', (req, res) => {
  checkLoggedIn(req, res)
  const ideas_id = req.params.ideas_id
  queryString = 'DELETE from ideas WHERE ideas_id = ?'
  dbConnection.query(queryString, [ideas_id], (err, results, field) => {
    if (err) {
      console.log('Failed to delete idea ' + err)
      return
    }
    console.log('Deleted idea' + results)
  })
  res.redirect('/ideas')

})

router.post('/api/submit_idea', (req, res) => {
  checkLoggedIn(req, res)
  idea = req.body.idea
  category = req.body.category

  queryString = 'INSERT INTO ideas (idea, category) \
  VALUES (?, ?)'
  dbConnection.query(queryString, [idea, category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit idea. ' + err)
      return
    }
    console.log('Logged new idea ' + results)
  })
  res.send('Great Success')
})

router.get('/api/ideas', (req, res) => {
  checkLoggedIn(req, res)
  const queryString = 'SELECT * FROM ideas'
  dbConnection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_ideas: ' + err)
    }
    console.log('Getting data from database for /get_ideas')
    res.send({ ideas: rows })
  })

})

module.exports = router
