const express = require('express')
const router = express.Router()
require('dotenv').config()
const passport = require('passport')
const db = require('./database')

const checkLoggedIn = (req, res) => {
	if (!req.isAuthenticated()) { res.redirect('/login') }
}

router.get('/', (req, res) => {
  checkLoggedIn(req, res)
  db.getCategories(res, 'index')
})

router.get('/login', (req, res) => {
    res.render('./pages/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
          if (info) { return res.send(info.message)}
          if (err) { return next(err) }
          if (!user) { return res.redirect('/login') }
          req.login(user, (err) => {
                  if (err) { return next(err) }
                  return res.redirect('/')
                })
        })(req, res, next)
})

router.get('/ideas', (req, res) => {
  checkLoggedIn(req, res)
  db.getIdeas(res, './pages/ideas')
})

router.get('/category', (req, res) => {
  checkLoggedIn(req, res)
  res.render('./pages/category')
})


router.post('/submit_idea', (req, res) => {
  checkLoggedIn(req, res)
  db.submitIdea([req.body.idea, req.body.category])
  res.redirect('/')
})

router.post('/submit_category', (req, res) => {
  checkLoggedIn(req, res)
  db.submitCategory([category])
  res.redirect('/')
})

router.post('/delete/:ideas_id', (req, res) => {
  checkLoggedIn(req, res)
  db.deleteIdea([req.params.ideas_id])
  res.redirect('/ideas')

})

router.post('/api/submit_idea', (req, res) => {
  checkLoggedIn(req, res)
  if (db.submitIdea([req.body.idea, req.body.category])) {
    res.send('Great Success')
  }
})

router.get('/api/ideas', (req, res) => {
  checkLoggedIn(req, res)
  db.getIdeas(res, '/api/ideas')
})

module.exports = router
