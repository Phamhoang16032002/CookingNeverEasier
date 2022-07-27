require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');

exports.Admit = async (req, res, next) => {
    res.render('Admit',{
      title: 'Cooking Never Easier - Admit',
      userProfile: JSON.stringify(req.oidc.user, null, 2), 
    });
  }
  
exports.amituserRecipe = async (req, res, next) => {
    var uname = req.body.name;
    var urecipe = new UserRecipe({});
    urecipe = await UserRecipe.find({ name: uname });
    var newrecipe = new Recipe({});
    newrecipe = urecipe;
    await Recipe.insertMany(newrecipe);
    res.redirect('/admit',{
      title: 'Cooking Never Easier - Admit',
      userProfile: JSON.stringify(req.oidc.user, null, 2), 
    });
  
  }