//////////////Import Dependencies////////
const express = require('express')
const User = require('../models/user')
/// bcrypt is used to encrypt passwords
const bcrypt = require('bcryptjs')

/////////////Create a router/////////////
const router = express.Router()

////////////////Our Routes//////////



// two sign up routes
// one GET to show the form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

// one POST to make the db request
router.post('/signup', async (req, res) => {
    console.log('this is our initial request body', req.body)
    // need to encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
        )
    console.log('this is our request body after hashing', req.body)
    User.create(req.body)
    // if created succesfully will redirect to login page
    .then(user => {
        console.log('this is the new user', user)
        res.redirect('/users/login')
    })
    // if unsuccesful send error
    .catch(error => {
        console.log(error)
        res.json(error)
    })
})

//  two login routes
//  one GET to show the form
router.get('/login', (req, res) => {
    res.render('users/login')
})
/// one POST to login and create session
router.post('/login', async (req, res) => {
    console.log('this is the request object', req)
    // destructure data from request body
    const { username, password } = req.body
    // console.log('this is username', username)
    // console.log('this is password', password)

    // first we find user
    User.findOne({ username })
    // check if user exists
    .then(async (user) => { // ._id
        // if they do we compare passwords to ensure its correct then use newly created session object
            if (user) {
                //compare password
                //bcrypt.compare evaluates to truthy or falsy value
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    //if compare comes back truthy we store user properties in session
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user._id
                    // redirect to '/fruits' page
                    console.log('this is session after login', req.session)
                    res.redirect('/lists')
                } else {
                    // send json error
                    res.json({ error: 'username or password incorrect' })
                }
            } else {
                // send error if user doesnt exist
                res.json({ error: 'user does not exist' })
            }
        
        })
        
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})
/// logout route
router.get('/logout', (req, res) => {
    //destroy session and redirect to main page
    req.session.destroy(ret => {
        console.log('this is returned from req.session.destroy', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/main')
    })
})

/// we can add an 'are you sure?' page if there is time

////////////export our router////////////
module.exports = router