require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');
var users = new User({});


/**
 * GET / yourRecipe
 * 
*/
exports.exploreyourRecipe = async (req, res,next) => {
    try {
      var email;
      if (users != '') {
        users.forEach(function (user, index) { email = user.email; })
        const limitNumber = 20;
        const yourRecipe = await Recipe.find({ 'email': email }).limit(limitNumber);
        res.render('yourRecipe', {
            title: 'Cooking Never Easier - Your Recipe',
            yourRecipe,
            userProfile: JSON.stringify(req.oidc.user, null, 2)  
          });
      }
    } catch (error) {
    }
  }
  

  
exports.deleteyourRecipe = async (req, res,next) => {
    try {
      await Recipe.deleteOne(
        { name: req.body.name }
      );
      res.redirect('/yourRecipe',{userProfile: JSON.stringify(req.oidc.user, null, 2) });
    } catch (error) {
      console.log(error);
    }
  }