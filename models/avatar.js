const database = require('./database');
const {DataTypes, Model} = require('sequelize');

module.exports = () => {
    class Avatar extends Model {}
    Avatar.init({
        name:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database, 
        modelName: 'avatar'
    });
    return Avatar;
}