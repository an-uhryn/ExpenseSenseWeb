import StyledTextField from '../../../components/StyledTextField'
import StyledButton from '../../../components/StyledButton'
import { useState } from 'react'
import { addGroup, editGroupById } from '../../../api'
import { fetchGroups } from '../../../redux/groups/groupsSlice'
import { useAppDispatch } from '../../../redux/hooks'
import { setModalState } from '../../../redux/modal/modalSlice'

const GroupFieldset = ({ edit, groupToEdit }: { edit?: boolean; groupToEdit?: string }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')

  const addNewGroup = () => {
    addGroup({ name })
      .then(() => {
        dispatch(fetchGroups())
      })
      .catch((error) => {
        dispatch(fetchGroups())
        console.log(error)
      })
  }

  const editGroup = () => {
    editGroupById({ name, _id: groupToEdit || '' })
      .then(() => {
        dispatch(fetchGroups())
        dispatch(setModalState(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <StyledTextField
        label="Name"
        onChange={(event) => {
          setName(event.target.value)
        }}
      />
      {edit ? (
        <StyledButton onClick={() => editGroup()}>Update group</StyledButton>
      ) : (
        <StyledButton onClick={() => addNewGroup()}>Add group</StyledButton>
      )}
    </>
  )
}

export default GroupFieldset
