const Authentication = require('./controllers/authentication');

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
    app.get('/', Authentication.fetchUsers);
    app.put('/:id/updateuser', Authentication.updateUser);
    app.delete('/:id/deleteuser', Authentication.deleteUser);
}