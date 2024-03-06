import StyledTextField from '../../../components/StyledTextField'
import StyledDropdown from '../../../components/StyledDropdown'
import StyledButton from '../../../components/StyledButton'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectAllCategories } from '../../../redux/categories/selectors'
import { selectAllTags } from '../../../redux/tags/selectors'
import { selectAllGroups } from '../../../redux/groups/selectors'
import { useEffect, useState } from 'react'
import { addExpense, editExpenseById } from '../../../api'
import { fetchExpenses } from '../../../redux/expenses/expensesSlice'
import { fetchCategories } from '../../../redux/categories/categoriesSlice'
import { fetchTags } from '../../../redux/tags/tagsSlice'
import { fetchGroups } from '../../../redux/groups/groupsSlice'
import { setModalState } from '../../../redux/modal/modalSlice'

const ExpenseFieldset = ({ edit, expenseToEdit }: { edit?: boolean; expenseToEdit?: string }) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectAllCategories)
  const tags = useAppSelector(selectAllTags)
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('0')
  const [categoryId, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [groupId, setGroupId] = useState<string>('')

  const addNewExpense = () => {
    addExpense({ name, description, value, categoryId, tagIds: [tag], groupId })
      .then(() => {
        dispatch(fetchExpenses())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const editExpense = () => {
    editExpenseById({
      name,
      description,
      value,
      categoryId,
      tagIds: [tag],
      _id: expenseToEdit || '',
    })
      .then(() => {
        dispatch(fetchExpenses())
        dispatch(setModalState(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchTags())
    dispatch(fetchGroups())
  }, [])

  return (
    <>
      <StyledTextField label="Name" onChange={(event) => setName(event.target.value)} />
      <StyledTextField
        label="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <StyledTextField label="Value" onChange={(event) => setValue(event.target.value)} />
      <StyledDropdown
        value={categoryId}
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
      <StyledDropdown
        value={groupId}
        label="Group"
        onChange={(e) => setGroupId(e.target.value)}
        data={groups}
      />

      {edit ? (
        <StyledButton onClick={() => editExpense()}>Update expense</StyledButton>
      ) : (
        <StyledButton onClick={() => addNewExpense()}>Add expense</StyledButton>
      )}
    </>
  )
}

export default ExpenseFieldset
