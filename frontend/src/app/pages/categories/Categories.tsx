import { useEffect, useState } from 'react'
import IconPicker from './components/IconPicker'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledColorPicker from '../../common/components/StyledColorPicker'
import { addCategory, removeCategoryById } from '../../api'
import PageContainer from '../../common/components/PageContainer'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import CategoryListItemContent from './components/CategoryListItemContent'
import { IAddCategories, IRemoveCategoryById } from '../../common/interfaces'
import StyledButton from '../../common/components/StyledButton'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../../redux/categories/selectors'
import { useAppDispatch } from '../../hooks'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useSelector(selectAllCategories)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')

  const addNewCategory = ({ name, description, color, icon }: IAddCategories) => {
    addCategory({ name, description, color, icon })
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeCategory = ({ categoryId }: IRemoveCategoryById) => {
    removeCategoryById({ categoryId })
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchCategories())
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
