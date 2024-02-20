import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {ICategory, IExpense, ITag} from "../../common/interfaces";
import PageContainer from "../../common/components/PageContainer";
import PageTitle from "../../common/components/PageTitle";
import PageHeaderBox from "../../common/components/PageHeaderBox";
import StyledTextField from "../../common/components/StyledTextField";
import StyledList from "../../common/components/StyledList";
import StyledListItem from "../../common/components/StyledListItem";
import ExpenseListItemContent from "./components/ExpenseListItemContent";

const Expenses = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [tags, setTags] = useState<ITag[]>([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')


  const fetchExpenses = () => {
    fetch('http://localhost:4000/api/expenses/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        setExpenses(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const fetchCategories = () => {
    fetch('http://localhost:4000/api/categories/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        setCategories(res)
        setCategory(res[0]._id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchTags = () => {
    fetch('http://localhost:4000/api/tags/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        setTags(res)
        setTag(res[0]._id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addExpense = () => {
    fetch('http://localhost:4000/api/expenses/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        value,
        categoryId: category,
        tagIds: [tag],
      }),
    })
      .then(() => {
        fetchExpenses()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeExpense = (expenseId: string) => {
    fetch(`http://localhost:4000/api/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
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
          <StyledTextField
            label="Name"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <StyledTextField
            label="Description"
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <StyledTextField
            label="Value"
            onChange={(event) => {
              setValue(parseFloat(event.target.value))
            }}
          />
          <Box style={{ maxWidth: 150, display: 'inline-flex' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category: ICategory) => {
                  return (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ maxWidth: 150, display: 'inline-flex' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tag</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                label="Age"
                onChange={(e) => setTag(e.target.value)}
              >
                {tags.map((tag: ITag) => {
                  return (
                    <MenuItem key={tag._id} value={tag._id}>
                      {tag.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained" color="success" style={{ height: 56 }} onClick={addExpense}>
            Add expense
          </Button>
        </PageHeaderBox>

        <StyledList>
          {expenses.map((expense: IExpense) => {
            let expenseCategory = categories.find((category: ICategory) => {
              return expense.categoryId == category._id
            })
            if (expenseCategory) {
              return (
                <StyledListItem
                  key={expense._id}
                  removeHandler={() => removeExpense(expense._id)}
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
