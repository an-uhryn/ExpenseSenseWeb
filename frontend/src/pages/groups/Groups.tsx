import { useEffect, useState } from 'react'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle'
import PageHeaderBox from '../../components/PageHeaderBox'
import StyledList from '../../components/StyledList'
import StyledListItem from '../../components/StyledListItem'
import GroupListItemContent from './components/GroupListItemContent'
import { removeGroupById } from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllGroups } from '../../redux/groups/selectors'
import { fetchGroups } from '../../redux/groups/groupsSlice'
import { fetchInvitations, fetchInviteeInvitations } from '../../redux/invitations/invitationsSlice'
import { setModalState } from '../../redux/modal/modalSlice'
import ModalWindow from '../../components/ModalWindow'
import { Grid, Box } from '@mui/material'
import ContainerTitle from '../../components/ContainerTitle'
import { selectUser } from '../../redux/user/selectors'
import InviteeList from './components/InviteeList'
import InviterList from './components/InviterList'
import GroupFieldset from './components/GroupFieldset'
import GroupMembers from './components/GroupMembers'

const Groups = () => {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(selectAllGroups)
  const user = useAppSelector(selectUser)
  const [groupToEdit, setGroupToEdit] = useState<string>('')

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

  useEffect(() => {
    dispatch(fetchGroups())
    dispatch(fetchInvitations())
    dispatch(fetchInviteeInvitations({ id: user.id }))
  }, [])

  return (
    <PageContainer>
      <PageTitle>Groups</PageTitle>
      <Grid container>
        <Grid item sm={6} style={{ paddingRight: 15 }}>
          <ContainerTitle>Your groups</ContainerTitle>
          <PageHeaderBox>
            <GroupFieldset />
          </PageHeaderBox>
          <StyledList>
            {groups.map((group) => {
              return (
                <Box key={group._id}>
                  <StyledListItem
                    key={group._id}
                    editHandler={() => openEditGroupModal({ id: group._id })}
                    removeHandler={() => removeGroup({ groupId: group._id })}
                  >
                    <GroupListItemContent group={group} />
                  </StyledListItem>
                  <GroupMembers group={group} />
                </Box>
              )
            })}
          </StyledList>
        </Grid>
        <Grid item sm={6} style={{ paddingLeft: 15 }}>
          <ContainerTitle>Your invitations</ContainerTitle>
          <InviterList />
          <ContainerTitle>You were invited</ContainerTitle>
          <InviteeList />
        </Grid>
      </Grid>

      <ModalWindow>
        <PageHeaderBox>
          <GroupFieldset edit={true} groupToEdit={groupToEdit} />
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Groups
