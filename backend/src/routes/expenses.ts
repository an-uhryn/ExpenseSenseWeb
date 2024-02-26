import express, { Router } from 'express'
import {
  getAllExpenses,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
} from '../controllers/expenseController'

const router: Router = express.Router()

router.get('/', getAllExpenses)
router.post('/', createExpense)
router.delete('/:id', deleteExpenseById)
router.patch('/:id', updateExpenseById)

export default router
