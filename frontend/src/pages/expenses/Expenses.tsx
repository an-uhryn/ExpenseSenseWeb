import { useEffect, useState } from 'react'
import { ICategory, IExpense, IRemoveExpense } from '../../common/interfaces'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle'
import PageHeaderBox from '../../components/PageHeaderBox'
import StyledList from '../../components/StyledList'
import StyledListItem from '../../components/StyledListItem'
import ExpenseListItemContent from './components/ExpenseListItemContent'
import { removeExpenseById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllCategories } from '../../redux/categories/selectors'
import { selectAllExpenses } from '../../redux/expenses/selectors'
import { fetchExpenses } from '../../redux/expenses/expensesSlice'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import ModalWindow from '../../components/ModalWindow'
import { setModalState } from '../../redux/modal/modalSlice'
import ExpenseFieldset from './components/ExpenseFieldset'

const Expenses = () => {
  const dispatch = useAppDispatch()
  const expenses = useAppSelector(selectAllExpenses)
  const categories = useAppSelector(selectAllCategories)
  const [expenseToEdit, setExpenseToEdit] = useState<string>('')

  const removeExpense = ({ expenseId }: IRemoveExpense) => {
    removeExpenseById({ expenseId })
      .then(() => {
        dispatch(fetchExpenses())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openEditExpenseModal = ({ id }: { id: string }) => {
    setExpenseToEdit(id)
    dispatch(setModalState(true))
  }

  useEffect(() => {
    dispatch(fetchExpenses())
    dispatch(fetchCategories())
  }, [])

  return (
    <PageContainer>
      <PageTitle>Expenses</PageTitle>
      <PageHeaderBox>
        <ExpenseFieldset />
      </PageHeaderBox>
      <StyledList>
        {expenses.map((expense: IExpense) => {
          let expenseCategory = categories.find((category: ICategory) => {
            return expense.categoryId === category._id
          })
          if (expenseCategory) {
            return (
              <StyledListItem
                key={expense._id}
                editHandler={() => openEditExpenseModal({ id: expense._id })}
                removeHandler={() => removeExpense({ expenseId: expense._id })}
              >
                <ExpenseListItemContent expenseCategory={expenseCategory} expense={expense} />
              </StyledListItem>
            )
          }
        })}
      </StyledList>
      <ModalWindow>
        <PageHeaderBox>
          <ExpenseFieldset edit={true} expenseToEdit={expenseToEdit} />
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Expenses
