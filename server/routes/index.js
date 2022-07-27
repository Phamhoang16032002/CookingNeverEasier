const express = require('express');
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const { requiresAuth } = require('express-openid-connect');

dotenv.config();

const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const updateController = require('../controllers/updateController');
const recipeController = require('../controllers/recipeController');
const userRecipeController = require('../controllers/userRecipeController');
const categoriesController = require('../controllers/categoriesController');
const searchController = require('../controllers/searchController');
const exploreLatestController = require('../controllers/exploreLatestController');
const exploreRandomController = require('../controllers/exploreRandomController');
const submitRecipeController = require('../controllers/submitRecipeController');
const yourRecipeController = require('../controllers/yourRecipeController');
const admitController = require('../controllers/admitController');
const manageController = require('../controllers/manageController');


router.get('/home', homeController.home);

router.get('/update', updateController.Update);
router.post('/update', updateController.updaterecipe);

router.get('/recipe/:id', recipeController.exploreRecipe);

router.get('/userRecipe/:id', userRecipeController.exploreuserRecipe);

router.get('/categories/:id', categoriesController.exploreCategoriesById);

router.post('/search', searchController.searchRecipe);

router.get('/explore-latest', exploreLatestController.exploreLatest);

router.get('/explore-random', exploreRandomController.exploreRandom);

router.get('/submit-recipe', submitRecipeController.submitRecipe);
router.post('/submit-recipe', submitRecipeController.submitRecipeOnPost);

router.get('/yourRecipe', yourRecipeController.exploreyourRecipe);
router.post('/yourRecipe', yourRecipeController.deleteyourRecipe);

router.get('/admit', admitController.Admit);
router.post('/admit', admitController.amituserRecipe);

router.get('/manage', manageController.Manage);
router.post('/manage', manageController.manageuser);

router.get('/', authController.auth);

router.get('/profile', authController.profile);

module.exports = router;