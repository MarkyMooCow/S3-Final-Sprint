// Modules! Yipee!
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// This is basically our authenticater!
// It can also decide our error messages based on the situation!
// And we got encryption!
async function intialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Wrong password' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
})}

// Packing up and sending it to whatever files need it!
// Just server.js really, but it can really be sent anywhere if you wanted.
module.exports = intialize