import { useEffect, useState } from 'react'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import PageHeaderBox from '../../common/components/PageHeaderBox'
import StyledTextField from '../../common/components/StyledTextField'
import StyledButton from '../../common/components/StyledButton'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import GroupListItemContent from './components/GroupListItemContent'
import { addGroup, editGroupById, removeGroupById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllGroups } from '../../redux/groups/selectors'
import { fetchGroups } from '../../redux/groups/groupsSlice'
import { setModalState } from '../../redux/modal/modalSlice'
import ModalWindow from '../../common/components/ModalWindow'

const Groups = () => {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(selectAllGroups)
  const [name, setName] = useState('')
  const [groupToEdit, setGroupToEdit] = useState<string>('')

  const addNewGroup = ({ name }: { name: string }) => {
    addGroup({ name })
      .then(() => {
        dispatch(fetchGroups())
      })
      .catch((error) => {
        dispatch(fetchGroups())
        console.log(error)
      })
  }

  const removeGroup = ({ groupId }: { groupId: string }) => {
    removeGroupById({ groupId })
      .then(() => {
        dispatch(fetchGroups())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openEditGroupModal = ({ id }: { id: string }) => {
    setGroupToEdit(id)
    dispatch(setModalState(true))
  }

  const editGroup = () => {
    editGroupById({ name, _id: groupToEdit })
      .then(() => {
        dispatch(fetchGroups())
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
    <PageContainer>
      <PageTitle>Groups</PageTitle>
      <PageHeaderBox>
        <StyledTextField
          label="Name"
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <StyledButton onClick={() => addNewGroup({ name })}>Add group</StyledButton>
      </PageHeaderBox>

      <StyledList>
        {groups.map((group) => {
          return (
            <StyledListItem
              key={group._id}
              editHandler={() => openEditGroupModal({ id: group._id })}
              removeHandler={() => removeGroup({ groupId: group._id })}
            >
              <GroupListItemContent group={group} />
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
          <StyledButton onClick={() => editGroup()}>Update group</StyledButton>
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Groups
