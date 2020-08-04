const express = require("express");
const app = express();
const { User } = require('../models/index.js');
const session = require("express-session");
const passport = require('passport');


app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});


isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated())
  if (req.user) return next();
  else
    return res.json({
      loggedin: false,
      isAdmin: false,
      message: 'User no validate',
    });
};

isAdmin = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.user.rol === 'admin') return next();
  else
    return res.json({
      loggedin: false,
      isAdmin: false,
      message: 'User is not admin',
    });
};

app.post('/login', (req, res, next) => {
  if(req.body.googleAuthenticated){
    User.findOne({where:{email:req.body.email}})
    .then(u=>{
      res.json({
        success: true,
        message: ('Welcolme again, ' + u.firstName + '!' ),
        userId: u.id,
        firstName: u.firstName,
      });
    })
  }
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
        info,
      });
    }
    if (!user) {
      return res.status(500).send({
        success: false,
        info,
      });
    }
    req.logIn(user, (error) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.json({
        success: true,
        message: ('Welcolme again, ' + req.user.firstName + '!' ),
        userId: req.user.id,
        firstName: req.user.firstName,
      });
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  if(req.isAuthenticated()){
    console.log("user logging out");
    req.logOut();
    res.send("user has logged out");
  } else {
    res.send("You don't have a session open");
  }
});

// Comprobacion
app.get('/check', isAuthenticated, (req, res) => {
  res.json({
    loggedin: true,
    message: 'User is passed',
    user: req.user,
  });
});

app.post('/changepassword', (req, res) => {
   User.update(req.body, {
        where: {
            password: req.body.password
        }
    })
    res.sendStatus(200);
  })

// app.get('/me');

// app.put('/promote');

module.exports = app;
