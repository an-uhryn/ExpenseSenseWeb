import express, { Router } from 'express'
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getGroupCategories,
} from '../controllers/categoryController'
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware'

const router: Router = express.Router()

router.use(isAuthorizedMiddleware)

router.get('/', getAllCategories)
router.get('/group/:id', getGroupCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategoryById)
router.patch('/:id', updateCategoryById)

export default router
