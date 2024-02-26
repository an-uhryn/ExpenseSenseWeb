import { useEffect, useState } from 'react'
import { IAddExpense, ICategory, IExpense, IRemoveExpense } from '../../common/interfaces'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import ExpenseListItemContent from './components/ExpenseListItemContent'
import { addExpense, removeExpenseById } from '../../api'
import StyledDropdown from '../../common/components/StyledDropdown'
import StyledButton from '../../common/components/StyledButton'
import { useAppDispatch } from '../../hooks'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../../redux/categories/selectors'
import { selectAllExpenses } from '../../redux/expenses/selectors'
import { fetchExpenses } from '../../redux/expenses/expensesSlice'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import { fetchTags } from '../../redux/tags/tagsSlice'
import { selectAllTags } from '../../redux/tags/selectors'

const Expenses = () => {
  const dispatch = useAppDispatch()
  const expenses = useSelector(selectAllExpenses)
  const categories = useSelector(selectAllCategories)
  const tags = useSelector(selectAllTags)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('0')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')

  const addNewExpense = ({ name, description, value, categoryId, tagIds }: IAddExpense) => {
    addExpense({ name, description, value, categoryId, tagIds })
      .then(() => {
        dispatch(fetchExpenses())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeExpense = ({ expenseId }: IRemoveExpense) => {
    removeExpenseById({ expenseId })
      .then(() => {
        dispatch(fetchExpenses())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchExpenses())
    dispatch(fetchCategories())
    dispatch(fetchTags())
  }, [])

  return (
    <PageContainer>
      <PageTitle>Expenses</PageTitle>
      <PageHeaderBox>
        <StyledTextField label="Name" onChange={(event) => setName(event.target.value)} />
        <StyledTextField
          label="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
        <StyledTextField label="Value" onChange={(event) => setValue(event.target.value)} />
        <StyledDropdown
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          data={categories}
        />
        <StyledDropdown
          value={tag}
          label="Tag"
          onChange={(e) => setTag(e.target.value)}
          data={tags}
        />

        <StyledButton
          onClick={() =>
            addNewExpense({
              name,
              description,
              value,
              categoryId: category,
              tagIds: [tag],
            })
          }
        >
          Add expense
        </StyledButton>
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
                removeHandler={() => removeExpense({ expenseId: expense._id })}
              >
                <ExpenseListItemContent expenseCategory={expenseCategory} expense={expense} />
              </StyledListItem>
            )
          }
        })}
      </StyledList>
    </PageContainer>
  )
}

export default Expenses
