import StyledTextField from '../../../components/StyledTextField'
import StyledDropdown from '../../../components/StyledDropdown'
import StyledColorPicker from '../../../components/StyledColorPicker'
import StyledButton from '../../../components/StyledButton'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectAllGroups } from '../../../redux/groups/selectors'
import {useEffect, useState} from 'react'
import {addTag, editTagById} from "../../../api";
import {fetchTags} from "../../../redux/tags/tagsSlice";
import {setModalState} from "../../../redux/modal/modalSlice";
import {fetchGroups} from "../../../redux/groups/groupsSlice";

const TagFieldset = ({ edit, tagToEdit }: { edit?: boolean; tagToEdit?: string }) => {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')
  const [groupId, setGroupId] = useState<string>('')

  const addNewTag = () => {
    addTag({ name, color, groupId })
      .then(() => {
        dispatch(fetchTags())
      })
      .catch((error) => {
        dispatch(fetchTags())
        console.log(error)
      })
  }

  const editTag = () => {
    editTagById({ name, color, _id: tagToEdit || '', groupId })
      .then(() => {
        dispatch(fetchTags())
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
      <StyledTextField
        label="Name"
        onChange={(event) => {
          setName(event.target.value)
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
        <StyledButton onClick={() => editTag()}>Update tag</StyledButton>
      ) : (
        <StyledButton onClick={() => addNewTag()}>Add tag</StyledButton>
      )}
    </>
  )
}

export default TagFieldset
