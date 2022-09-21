const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init
(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                len: [3]
            }
        },
        user_id:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'user',
                key: 'id'
            }
        },
        journal_id:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'journal',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;