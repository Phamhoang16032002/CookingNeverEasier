require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


exports.Update = async (req, res, next) => {
    res.render('update', {
      userProfile: JSON.stringify(req.oidc.user, null, 2)
    } );
  }
  
  
exports.updaterecipe = async (req, res, next) => {
    try {
      await Recipe.updateOne(
        { name: req.body.name },
        {
          $set: {
            description: req.body.description,
            ingredients: req.body.ingredients
          }
        }
      );
      res.redirect('/yourRecipe');
      res.n; // Number of documents matched
      res.nModified; // Number of documents modified
    } catch (error) {
      console.log(error);
    }
  }
  