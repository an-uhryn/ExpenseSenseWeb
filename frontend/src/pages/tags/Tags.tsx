import { useEffect, useState } from 'react'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle'
import PageHeaderBox from '../../components/PageHeaderBox'
import StyledList from '../../components/StyledList'
import StyledListItem from '../../components/StyledListItem'
import { IRemoveTag } from '../../common/interfaces'
import TagListItemContent from './components/TagListItemContent'
import { removeTagById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllTags } from '../../redux/tags/selectors'
import { fetchTags } from '../../redux/tags/tagsSlice'
import { setModalState } from '../../redux/modal/modalSlice'
import ModalWindow from '../../components/ModalWindow'
import TagFieldset from "./components/TagFieldset";

const Tags = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(selectAllTags)
  const [tagToEdit, setTagToEdit] = useState<string>('')

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

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  return (
    <PageContainer>
      <PageTitle>Tags</PageTitle>
      <PageHeaderBox>
        <TagFieldset />
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
          <TagFieldset edit={true} tagToEdit={tagToEdit} />
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Tags
