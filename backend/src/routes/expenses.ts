import express, { Router } from 'express'
import { getAllExpenses, createExpense, deleteExpenseById } from '../controllers/expenseController'

const router: Router = express.Router()

router.get('/', getAllExpenses)
router.post('/', createExpense)
router.delete('/:id', deleteExpenseById)

export default router
