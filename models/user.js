const database = require('./database');
const {DataTypes, Model} = require('sequelize');


module.exports = () => { 
    class User extends Model {}
    User.init({
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        otp:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: database, 
        modelName: 'user'
    });
    return User;
}