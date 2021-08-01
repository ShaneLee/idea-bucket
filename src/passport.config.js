const session = require('express-session')
const uniqid = require('uniqid')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const users = [
  {
    id: process.env.USER_ID, 
    email: process.env.USER,
    password: process.env.PASSWORD
  }
]

passport.use(new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
          const user = users[0]
          if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                  }
            if (password != user.password) {
                      return done(null, false, { message: 'Invalid credentials.\n' });
                    }
            return done(null, user);
        }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

module.exports = (app) => {
  app.use(session({
    genid: (req) => uniqid(),
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true}))

  app.use(passport.initialize())
  app.use(passport.session())

}
