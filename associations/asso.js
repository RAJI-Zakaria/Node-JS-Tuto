// Set up the models
var User = require('../models/User.js');
var Post = require('../models/Posts.js');

// Set the correct associations
User.hasMany(Post, {})
Post.belongsTo(User, {});