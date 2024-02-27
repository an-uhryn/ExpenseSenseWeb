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
import { addTag, removeTagById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllTags } from '../../redux/tags/selectors'
import { fetchTags } from '../../redux/tags/tagsSlice'

const Tags = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(selectAllTags)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')

  const addNewTag = ({ name, color }: IAddTag) => {
    addTag({ name, color })
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

  useEffect(() => {
    dispatch(fetchTags())
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
        <StyledColorPicker color={color} onChange={setColor} />
        <StyledButton onClick={() => addNewTag({ name, color })}>Add tag</StyledButton>
      </PageHeaderBox>

      <StyledList>
        {tags.map((tag) => {
          return (
            <StyledListItem
              key={tag._id}
              editHandler={() => {}}
              removeHandler={() => removeTag({ tagId: tag._id })}
            >
              <TagListItemContent tag={tag} />
            </StyledListItem>
          )
        })}
      </StyledList>
    </PageContainer>
  )
}

export default Tags
