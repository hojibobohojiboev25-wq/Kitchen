import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth';
import * as recipeController from '../controllers/recipeController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET routes
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);

// POST routes (require admin or manager)
router.post('/', requireRole('admin', 'manager'), recipeController.createRecipe);
router.post('/:id/scale', recipeController.scaleRecipe);

// PUT routes (require admin or manager)
router.put('/:id', requireRole('admin', 'manager'), recipeController.updateRecipe);

// DELETE routes (require admin)
router.delete('/:id', requireRole('admin'), recipeController.deleteRecipe);

export default router;
