require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async (req, res, next) => {
    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { 
        title: 'Cooking Never Easier - Categoreis', 
        categoryById,
        userProfile: JSON.stringify(req.oidc.user, null, 2), 
        });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  }
  