const database = require('./database');
const Auth = require('./auth')();
const UserInfo = require('./user_info')();
const Contact = require('./contact')();

// One to One Relationship
Auth.hasOne(UserInfo, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    foreignKey: 
        'email'
    }
);
UserInfo.belongsTo(Auth, {foreignKey: 'email'});

// One to Many Relationship
Auth.hasMany(Contact, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    foreignKey: 
        'email'
    }
);
Contact.belongsTo(Auth, {foreignKey: 'email'});

// Sync all models that aren't already in the database
(async () => {
    await database.sync({alter: true});
    console.log("all tables synchonised")
})();

const models = {
    Auth,
    UserInfo,
    Contact
}

module.exports = models;

