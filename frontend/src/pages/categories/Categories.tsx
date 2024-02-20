import { useEffect, useState } from 'react'
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
import { Category, IAddCategories, IRemoveCategoryById } from '../../common/interfaces'
import StyledButton from '../../common/components/StyledButton'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')

  const fetchCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addNewCategory = ({ name, description, color, icon }: IAddCategories) => {
    addCategory({ name, description, color, icon })
      .then(() => {
        fetchCategories()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeCategory = ({ categoryId }: IRemoveCategoryById) => {
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
            <StyledListItem
              key={category._id}
              removeHandler={() => removeCategory({ categoryId: category._id })}
            >
              <CategoryListItemContent category={category} />
            </StyledListItem>
          )
        })}
      </StyledList>
    </PageContainer>
  )
}

export default Categories
