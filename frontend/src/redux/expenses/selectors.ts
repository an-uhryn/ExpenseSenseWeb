import { RootState } from '../store'

export const selectAllExpenses = (state: RootState) => state.expenses.list
