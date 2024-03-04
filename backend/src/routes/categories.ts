import express, { NextFunction, Request, Response, Router } from 'express'
import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getGroupCategories,
} from '../controllers/categoryController'

const router: Router = express.Router()

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.use(authorizeUser)

router.get('/', getAllCategories)
router.get('/group/:id', getGroupCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategoryById)
router.patch('/:id', updateCategoryById)

export default router
