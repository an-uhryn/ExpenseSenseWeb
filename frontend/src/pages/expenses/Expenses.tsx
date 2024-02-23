import { useEffect, useState } from 'react'
import { IAddExpense, ICategory, IExpense, IRemoveExpense, ITag } from '../../common/interfaces'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import ExpenseListItemContent from './components/ExpenseListItemContent'
import { addExpense, getCategories, getExpenses, getTags, removeExpenseById } from '../../api'
import StyledDropdown from '../../common/components/StyledDropdown'
import StyledButton from '../../common/components/StyledButton'
import StyledMultiselectDropdown from '../../common/components/StyledMultiselectDropdown'
import { SelectChangeEvent } from '@mui/material'

const Expenses = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [tags, setTags] = useState<ITag[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('0')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState<string[]>([])

  const fetchExpenses = () => {
    getExpenses()
      .then((res) => {
        setExpenses(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const fetchCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res)
        setCategory(res[0]._id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchTags = () => {
    getTags()
      .then((res) => {
        setTags(res)
        setTag(res[0]._id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addNewExpense = ({ name, description, value, categoryId, tagIds }: IAddExpense) => {
    addExpense({ name, description, value, categoryId, tagIds })
      .then(() => {
        fetchExpenses()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeExpense = ({ expenseId }: IRemoveExpense) => {
    removeExpenseById({ expenseId })
      .then(() => {
        fetchExpenses()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
    fetchTags()
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
        <StyledMultiselectDropdown
          label="Tag"
          onChange={(e) => {
            const value = e.target.value
            setTag((prevTags: string[]) => {
              if (prevTags.includes(value)) {
                return prevTags.filter((tag: string) => tag !== value)
              } else {
                return [...prevTags, value]
              }
            })
          }}
          data={tags}
          value={tag}
        />

        <StyledButton
          onClick={() =>
            addNewExpense({
              name,
              description,
              value,
              categoryId: category,
              tagIds: tag,
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
