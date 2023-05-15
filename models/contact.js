const database = require('./database');
const {DataTypes, Model} = require('sequelize');

module.exports = () => {
    class Contact extends Model {}
    Contact.init({
        number: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database, 
        modelName: 'contact'
    });
    return Contact;
}