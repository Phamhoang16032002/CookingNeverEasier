require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var userslogin = new User({});
var users = new User({});

exports.auth = async (req, res, next) => {
  if( JSON.stringify(req.oidc.user, null, 2) != undefined)
  {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);
      const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
      const vegan = await Recipe.find({ 'category': 'Vegan' }).limit(limitNumber);
      const diet = await Recipe.find({ 'category': 'Diet' }).limit(limitNumber);
      const food = { latest, american, vegan, diet };
      userslogin = req.oidc.user;
      users = await User.find({ 'email': userslogin.email});
      console.log(users);
      if (users == '') {
        var user = new User({
          "name": userslogin.name,
          "sub": userslogin.sub,
          "email": userslogin.email,
          "nickname": userslogin.nickname,
          "picture": userslogin.picture,
          "email_verified": userslogin.email_verified,
        })
        await user.save();
      }
      res.render('home', { 
        title: 'Cooking Never Easier - Home', 
        categories, 
        food, 
        userProfile: JSON.stringify(req.oidc.user, null, 2), 
      });
  }
  else
  { 
      res.render('index', {
      title: 'Cooking Never Easier',
      });
  }
}


exports.profile = async (req, res, next) => {
    res.render('profile', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'Profile'
    });
}