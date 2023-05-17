const database = require('./database');
const {DataTypes, Model} = require('sequelize');

module.exports = () => {
    class Contact extends Model {}
    Contact.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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