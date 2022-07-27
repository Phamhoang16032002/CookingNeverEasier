require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async (req, res, next) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { 
        title: 'Cooking Never Easier - Explore Latest',
        recipe,
        userProfile: JSON.stringify(req.oidc.user, null, 2) 
      });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  }