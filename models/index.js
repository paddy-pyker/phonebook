const database = require('./database');
const User = require('./user')();
const Contact = require('./contact')();

// One to Many Relationship
User.hasMany(Contact, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'email'
}); 

Contact.belongsTo(User, {foreignKey: 'email'});


const models = {
    User,
    Contact,
    database
}

module.exports = models;

