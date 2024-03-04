import express, { NextFunction, Request, Response, Router } from 'express'
import {
  getAllExpenses,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
  getGroupExpenses,
} from '../controllers/expenseController'

const router: Router = express.Router()

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.use(authorizeUser)

router.get('/', getAllExpenses)
router.get('/group/:id', getGroupExpenses)
router.post('/', createExpense)
router.delete('/:id', deleteExpenseById)
router.patch('/:id', updateExpenseById)

export default router
