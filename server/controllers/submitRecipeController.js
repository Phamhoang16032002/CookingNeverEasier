require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const UserRecipe = require('../models/UserRecipe');



/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async (req, res, next) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { 
      title: 'Cooking Never Easier - Submit Recipe',
      infoErrorsObj,
      infoSubmitObj,
      userProfile: JSON.stringify(req.oidc.user, null, 2) 
    });
  }
  
  /**
   * POST /submit-recipe
   * Submit Recipe
  */
  exports.submitRecipeOnPost = async (req, res, next) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function (err) {
        })
  
      }
  
      const newRecipe = new UserRecipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
  
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
  }