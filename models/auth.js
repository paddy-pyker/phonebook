const database = require('./database');
const {DataTypes, Model} = require('sequelize');


module.exports = () => { 
    class Auth extends Model {}
    Auth.init({
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        otp:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jwt:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize: database, 
        modelName: 'auth'
    });
    return Auth;
}
