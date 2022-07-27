require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});

exports.Manage = async (req, res, next) => {
    const userRecipe = await UserRecipe.find({}).limit(9);
    res.render('manage', { 
      title: 'Cooking Never Easier', 
      userRecipe,
      userProfile: JSON.stringify(req.oidc.user, null, 2)  
    });
  }
  
  exports.manageuser = async (req, res, next) => {
    try {
      await User.deleteOne(
        { email: req.body.email }
      );
      res.redirect('/manage',{ 
        title: 'Cooking Never Easier - Manage',
        userProfile: JSON.stringify(req.oidc.user, null, 2) 
      });
    } catch (error) {
      console.log(error);
    }
  
  }