import { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import IconPicker from './components/IconPicker'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledColorPicker from '../../common/components/StyledColorPicker'
import { addCategory, getCategories, removeCategoryById } from '../../api'
import PageContainer from '../../common/components/PageContainer'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import CategoryListItemContent from './components/CategoryListItemContent'
import { Category } from '../../common/interfaces'
import StyledButton from '../../common/components/StyledButton'

interface IGetCategories {
  name: string
  description: string
  color: string
  icon: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')

  const [categoryToRemove, setCategoryToRemove] = useState<string>('')

  const handleClickOpen = (category: Category) => {
    setCategoryToRemove(category._id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addNewCategory = ({ name, description, color, icon }: IGetCategories) => {
    addCategory({ name, description, color, icon })
      .then(() => {
        fetchCategories()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeCategory = (categoryId: string) => {
    removeCategoryById({ categoryId })
      .then(() => {
        fetchCategories()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <PageContainer>
      <PageTitle>Categories</PageTitle>
      <PageHeaderBox>
        <IconPicker icon={icon} setIcon={setIcon} />
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
        <StyledColorPicker color={color} onChange={setColor} />

        <StyledButton onClick={() => addNewCategory({ name, description, color, icon })}>
          Add category
        </StyledButton>
      </PageHeaderBox>

      <StyledList>
        {categories.map((category) => {
          return (
            <StyledListItem key={category._id} removeHandler={() => handleClickOpen(category)}>
              <CategoryListItemContent category={category} />
            </StyledListItem>
          )
        })}
      </StyledList>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              removeCategory(categoryToRemove)
              handleClose()
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}

export default Categories
