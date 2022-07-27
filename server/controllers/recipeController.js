require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


/**
 * GET /recipe/:id
 * Recipe 
*/
exports.exploreRecipe = async (req, res, next) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { 
      title: 'Cooking Never Easier - Recipe',
      recipe,
      userProfile: JSON.stringify(req.oidc.user, null, 2) 
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}
