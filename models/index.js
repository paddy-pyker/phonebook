const database = require('./database');
const User = require('./user')();
const Contact = require('./contact')();
const Avatar = require('./avatar')();

// One to Many Relationship
User.hasMany(Contact, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}); 

Contact.belongsTo(User, {foreignKey: 'email'});


const models = {
    User,
    Contact,
    Avatar,
    database
}

module.exports = models;

