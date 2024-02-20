import express, { Router } from 'express'
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
} from '../controllers/categoryController'

const router: Router = express.Router()

router.get('/', getAllCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategoryById)

export default router
