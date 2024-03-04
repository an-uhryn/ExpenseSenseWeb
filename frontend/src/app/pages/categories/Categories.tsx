import { useEffect, useState } from 'react'
import IconPicker from './components/IconPicker'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledColorPicker from '../../common/components/StyledColorPicker'
import { addCategory, editCategoryById, removeCategoryById } from '../../api'
import PageContainer from '../../common/components/PageContainer'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import CategoryListItemContent from './components/CategoryListItemContent'
import { IAddCategories, IRemoveCategoryById } from '../../common/interfaces'
import StyledButton from '../../common/components/StyledButton'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import { selectAllCategories } from '../../redux/categories/selectors'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ModalWindow from '../../common/components/ModalWindow'
import { setModalState } from '../../redux/modal/modalSlice'
import StyledDropdown from '../../common/components/StyledDropdown'
import { selectAllGroups } from '../../redux/groups/selectors'
import { fetchGroups } from '../../redux/groups/groupsSlice'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectAllCategories)
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')
  const [categoryToEdit, setCategoryToEdit] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')

  const addNewCategory = ({ name, description, color, icon, groupId }: IAddCategories) => {
    addCategory({ name, description, color, icon, groupId })
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

  const openEditCategoryModal = ({ id }: { id: string }) => {
    setCategoryToEdit(id)
    dispatch(setModalState(true))
  }

  const editCategory = () => {
    editCategoryById({ name, description, color, icon, _id: categoryToEdit, groupId })
      .then(() => {
        dispatch(fetchCategories())
        dispatch(setModalState(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchGroups())
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
        <StyledDropdown
          value={groupId}
          label="Group"
          onChange={(e) => setGroupId(e.target.value)}
          data={groups}
        />
        <StyledColorPicker color={color} onChange={setColor} />
        <StyledButton onClick={() => addNewCategory({ name, description, color, icon, groupId })}>
          Add category
        </StyledButton>
      </PageHeaderBox>

      <StyledList>
        {categories.map((category) => {
          return (
            <StyledListItem
              key={category._id}
              editHandler={() => openEditCategoryModal({ id: category._id })}
              removeHandler={() => removeCategory({ categoryId: category._id })}
            >
              <CategoryListItemContent category={category} />
            </StyledListItem>
          )
        })}
      </StyledList>
      <ModalWindow>
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
          <StyledDropdown
            value={groupId}
            label="Group"
            onChange={(e) => setGroupId(e.target.value)}
            data={groups}
          />
          <StyledColorPicker color={color} onChange={setColor} />
          <StyledButton onClick={() => editCategory()}>Update category</StyledButton>
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Categories
