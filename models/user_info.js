const database = require('./database');
const {DataTypes, Model} = require('sequelize');

module.exports = () => {
    class UserInfo extends Model {}
    UserInfo.init({
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database, 
        modelName: 'user_info'
    });
    return UserInfo;
}