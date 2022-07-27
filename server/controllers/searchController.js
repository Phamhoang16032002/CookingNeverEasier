require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});

/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async (req, res, next) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { 
        title: 'Cooking Never Easier - Search', 
        recipe,
        userProfile: JSON.stringify(req.oidc.user, null, 2) 
      });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  
  }