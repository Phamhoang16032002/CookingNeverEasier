require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');

exports.exploreuserRecipe = async (req, res, next) => {
    try {
      let recipeId = req.params.id;
      const recipe = await UserRecipe.findById(recipeId);
      res.render('userRecipe', { 
        title: 'Cooking Never Easier - Recipe', 
        recipe, 
        userProfile: JSON.stringify(req.oidc.user, null, 2) 
      });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  }