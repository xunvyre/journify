const User = require('./User');
const Journal = require('./Journal');
const Comment = require('./Comment');

//create associations
User.hasMany(Journal, {foreignKey: 'user_id'});

Journal.belongsTo(User, {foreignKey: 'user_id'});

Comment.belongsTo(User, {foreignKey: 'user_id'});
  
Comment.belongsTo(Journal, {foreignKey: 'journal_id'});

User.hasMany(Comment, {foreignKey: 'user_id'});

Journal.hasMany(Comment, {foreignKey: 'journal_id'});

module.exports = {User, Journal, Comment};