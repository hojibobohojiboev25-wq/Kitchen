import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { recipeService } from '../services/recipeService';

export const getAllRecipes = async (req: AuthRequest, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeById = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);
    res.json(recipe);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRecipe = async (req: AuthRequest, res: Response) => {
  try {
    await recipeService.deleteRecipe(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const scaleRecipe = async (req: AuthRequest, res: Response) => {
  try {
    const { portions } = req.body;
    const recipe = await recipeService.scaleRecipe(req.params.id, portions);
    res.json(recipe);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
