import IconPicker from './IconPicker'
import StyledTextField from '../../../components/StyledTextField'
import StyledDropdown from '../../../components/StyledDropdown'
import StyledColorPicker from '../../../components/StyledColorPicker'
import StyledButton from '../../../components/StyledButton'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectAllGroups } from '../../../redux/groups/selectors'
import { addCategory, editCategoryById } from '../../../api'
import { fetchCategories } from '../../../redux/categories/categoriesSlice'
import { setModalState } from '../../../redux/modal/modalSlice'
import { fetchGroups } from '../../../redux/groups/groupsSlice'

const CategoriesFieldset = ({
  edit,
  categoryToEdit,
}: {
  edit?: boolean
  categoryToEdit?: string
}) => {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('fastfood')
  const [groupId, setGroupId] = useState<string>('')
  const [color, setColor] = useState('#000')

  const addNewCategory = () => {
    addCategory({ name, description, color, icon, groupId })
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editCategory = () => {
    editCategoryById({ name, description, color, icon, _id: categoryToEdit || '', groupId })
      .then(() => {
        dispatch(fetchCategories())
        dispatch(setModalState(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchGroups())
  }, [])

  return (
    <>
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
      {edit ? (
        <StyledButton onClick={() => editCategory()}>Update category</StyledButton>
      ) : (
        <StyledButton onClick={() => addNewCategory()}>Add category</StyledButton>
      )}
    </>
  )
}

export default CategoriesFieldset
