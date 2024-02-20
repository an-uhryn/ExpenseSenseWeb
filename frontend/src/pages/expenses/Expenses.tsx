import { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  Grid,
  ListItemText,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import Icon from '@mui/material/Icon'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachMoney from '@mui/icons-material/AttachMoney'
import { HexColorPicker } from 'react-colorful'

interface Expense {
  name: string
  description: string
  value: string
  categoryId: string
  tagIds: []
  _id: string
}

interface Category {
  name: string
  description: string
  color: string
  _id: string
  icon: string
}

interface Tag {
  name: string
  color: string
  _id: string
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [dense, setDense] = useState(false)
  const [secondary, setSecondary] = useState(false)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')

  const [expenseToRemove, setExpenseToRemove] = useState<string>('')

  const handleClickOpen = (expense: Expense) => {
    setExpenseToRemove(expense._id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
      .then((res) => {
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
      .then((res) => {
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
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Expenses
        </Typography>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="medium"
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <TextField
            id="outlined-basic"
            label="Value"
            variant="outlined"
            size="medium"
            value={value}
            type="number"
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
                {categories.map((category: Category) => {
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
                {tags.map((tag: Tag) => {
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
        </Box>

        <List dense={dense}>
          {expenses.map((expense: Expense) => {
            let expenseCategory = categories.find((category: Category) => {
              return expense.categoryId == category._id
            })
            return (
              <ListItem
                key={expense._id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleClickOpen(expense)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background: 'transparent',
                      border: '1px solid #555',
                    }}
                  >
                    <Icon style={{ color: expenseCategory?.color || '#555' }}>
                      {expenseCategory?.icon || 'pets'}
                    </Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={expense.name} secondary={expense.description} />
              </ListItem>
            )
          })}
        </List>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this expense?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              removeExpense(expenseToRemove)
              handleClose()
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Expenses
