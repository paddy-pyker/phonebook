const database = require('./database');
const {DataTypes, Model} = require('sequelize');

module.exports = () => {
    class Contact extends Model {}
    Contact.init({
        phone: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database, 
        modelName: 'contact'
    });
    return Contact;
}