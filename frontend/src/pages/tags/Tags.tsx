import { useEffect, useState } from 'react'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledColorPicker from '../../common/components/StyledColorPicker'
import StyledButton from '../../common/components/StyledButton'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import { IAddTag, IRemoveTag, ITag } from '../../common/interfaces'
import TagListItemContent from './components/TagListItemContent'
import { getTags, addTag, removeTagById } from '../../api'

const Tags = () => {
  const [tags, setTags] = useState<ITag[]>([])
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000')

  const fetchTags = () => {
    getTags()
      .then((res) => {
        setTags(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addNewTag = ({ name, color }: IAddTag) => {
    addTag({ name, color })
      .then(() => {
        fetchTags()
      })
      .catch((error) => {
        fetchTags()
        console.log(error)
      })
  }

  const removeTag = ({ tagId }: IRemoveTag) => {
    removeTagById({ tagId })
      .then(() => {
        fetchTags()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchTags()
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
            <StyledListItem key={tag._id} removeHandler={() => removeTag({ tagId: tag._id })}>
              <TagListItemContent tag={tag} />
            </StyledListItem>
          )
        })}
      </StyledList>
    </PageContainer>
  )
}

export default Tags
