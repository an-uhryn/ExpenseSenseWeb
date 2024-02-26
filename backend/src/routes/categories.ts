import express, { Router } from 'express'
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
} from '../controllers/categoryController'

const router: Router = express.Router()

router.get('/', getAllCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategoryById)
router.patch('/:id', updateCategoryById)

export default router
