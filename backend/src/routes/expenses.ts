import express, { Router } from 'express'
import {
  getAllExpenses,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
  getGroupExpenses,
} from '../controllers/expenseController'
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware'

const router: Router = express.Router()

router.use(isAuthorizedMiddleware)

router.get('/', getAllExpenses)
router.get('/group/:id', getGroupExpenses)
router.post('/', createExpense)
router.delete('/:id', deleteExpenseById)
router.patch('/:id', updateExpenseById)

export default router
