import { useEffect, useState } from 'react'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledColorPicker from '../../common/components/StyledColorPicker'
import StyledButton from '../../common/components/StyledButton'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import { IAddTag, IRemoveTag } from '../../common/interfaces'
import TagListItemContent from './components/TagListItemContent'
import { addTag, editTagById, removeTagById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllTags } from '../../redux/tags/selectors'
import { fetchTags } from '../../redux/tags/tagsSlice'
import { setModalState } from '../../redux/modal/modalSlice'
import ModalWindow from '../../common/components/ModalWindow'
import { fetchGroups } from '../../redux/groups/groupsSlice'
import { selectAllGroups } from '../../redux/groups/selectors'
import StyledDropdown from '../../common/components/StyledDropdown'

const Tags = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(selectAllTags)
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')
  const [tagToEdit, setTagToEdit] = useState<string>('')
  const [groupId, setGroupId] = useState<string>('')

  const addNewTag = ({ name, color }: IAddTag) => {
    addTag({ name, color, groupId })
      .then(() => {
        dispatch(fetchTags())
      })
      .catch((error) => {
        dispatch(fetchTags())
        console.log(error)
      })
  }

  const removeTag = ({ tagId }: IRemoveTag) => {
    removeTagById({ tagId })
      .then(() => {
        dispatch(fetchTags())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openEditTagModal = ({ id }: { id: string }) => {
    setTagToEdit(id)
    dispatch(setModalState(true))
  }

  const editTag = () => {
    editTagById({ name, color, _id: tagToEdit, groupId })
      .then(() => {
        dispatch(fetchTags())
        dispatch(setModalState(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchGroups())
  }, [])

  return (
    <PageContainer>
      <PageTitle>Tags</PageTitle>
      <PageHeaderBox>
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
        <StyledButton onClick={() => addNewTag({ name, color, groupId })}>Add tag</StyledButton>
      </PageHeaderBox>

      <StyledList>
        {tags.map((tag) => {
          return (
            <StyledListItem
              key={tag._id}
              editHandler={() => openEditTagModal({ id: tag._id })}
              removeHandler={() => removeTag({ tagId: tag._id })}
            >
              <TagListItemContent tag={tag} />
            </StyledListItem>
          )
        })}
      </StyledList>
      <ModalWindow>
        <PageHeaderBox>
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
          <StyledButton onClick={() => editTag()}>Update tag</StyledButton>
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Tags
