const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ test: "HERE"})
    })
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin);
    app.get('/fetchusers', Authentication.fetchUsers);
    app.put('/:id/updateuser', Authentication.updateUser);
    app.delete('/:id/deleteuser', Authentication.deleteUser);
}