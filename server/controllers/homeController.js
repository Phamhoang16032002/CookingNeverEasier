require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');


exports.home = async (req, res, next) => {
    try {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);
      const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
      const vegan = await Recipe.find({ 'category': 'Vegan' }).limit(limitNumber);
      const diet = await Recipe.find({ 'category': 'Diet' }).limit(limitNumber);
      const food = { latest, american, vegan, diet };
      res.render('home', { 
        title: 'Cooking Never Easier - Home', 
        categories, 
        food, 
        userProfile: JSON.stringify(req.oidc.user, null, 2), 
      });
    } catch (error) {
      res.satus(500).send({ message: error.message || "Error Occured" });
    }
  }
