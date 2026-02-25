"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getAllRecipes = void 0;
const recipeService_1 = require("../services/recipeService");
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService_1.recipeService.getAllRecipes();
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllRecipes = getAllRecipes;
const getRecipeById = async (req, res) => {
    try {
        const recipe = await recipeService_1.recipeService.getRecipeById(req.params.id);
        res.json(recipe);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.getRecipeById = getRecipeById;
const createRecipe = async (req, res) => {
    try {
        const recipe = await recipeService_1.recipeService.createRecipe(req.body);
        res.status(201).json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createRecipe = createRecipe;
const updateRecipe = async (req, res) => {
    try {
        const recipe = await recipeService_1.recipeService.updateRecipe(req.params.id, req.body);
        res.json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateRecipe = updateRecipe;
const deleteRecipe = async (req, res) => {
    try {
        await recipeService_1.recipeService.deleteRecipe(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteRecipe = deleteRecipe;
const scaleRecipe = async (req, res) => {
    try {
        const { portions } = req.body;
        const recipe = await recipeService_1.recipeService.scaleRecipe(req.params.id, portions);
        res.json(recipe);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.scaleRecipe = scaleRecipe;
