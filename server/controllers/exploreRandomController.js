require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async (req, res, next) => {
    try {
      let count = await Recipe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let recipe = await Recipe.findOne().skip(random).exec();
      res.render('explore-random', { 
        title: 'Cooking Never Easier - Explore Random',
        recipe,
        userProfile: JSON.stringify(req.oidc.user, null, 2) 
      });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  }