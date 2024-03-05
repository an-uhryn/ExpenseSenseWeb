import { useEffect, useState } from 'react'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle'
import PageHeaderBox from '../../components/PageHeaderBox'
import StyledTextField from '../../components/StyledTextField'
import StyledButton from '../../components/StyledButton'
import StyledList from '../../components/StyledList'
import StyledListItem from '../../components/StyledListItem'
import GroupListItemContent from './components/GroupListItemContent'
import {
  acceptInvitationById,
  addGroup,
  editGroupById,
  removeGroupById,
  removeGroupMemberById,
  removeInvitationById,
} from '../../api'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllGroups } from '../../redux/groups/selectors'
import { fetchGroups } from '../../redux/groups/groupsSlice'
import { fetchInvitations, fetchInviteeInvitations } from '../../redux/invitations/invitationsSlice'
import { setModalState } from '../../redux/modal/modalSlice'
import ModalWindow from '../../components/ModalWindow'
import { Grid, Paper, Stack, Chip, Box } from '@mui/material'
import ContainerTitle from '../../components/ContainerTitle'
import InviteUser from './components/InviteUser'
import { selectAllInvitations, selectInviteeInvitations } from '../../redux/invitations/selectors'
import { selectUser } from '../../redux/user/selectors'
import { IUser } from '../../common/interfaces'

const Groups = () => {
  const dispatch = useAppDispatch()
  const groups = useAppSelector(selectAllGroups)
  const invitations = useAppSelector(selectAllInvitations)
  const inviteeInvitations = useAppSelector(selectInviteeInvitations)
  const user = useAppSelector(selectUser)
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

  const removeGroupMember = ({ memberId, _id }: { memberId: string; _id: string }) => {
    removeGroupMemberById({ memberId, _id }).then(() => {
      dispatch(fetchGroups())
    })
  }

  const removeInvitation = ({ invitationId }: { invitationId: string }) => {
    removeInvitationById({ invitationId })
      .then(() => {
        dispatch(fetchInvitations())
        dispatch(fetchInviteeInvitations({ id: user.id }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const acceptInvitation = ({
    invitationId,
    groupId,
  }: {
    invitationId: string
    groupId: string
  }) => {
    acceptInvitationById({ id: invitationId, groupId }).then(() => {
      dispatch(fetchGroups())
      dispatch(fetchInvitations())
      dispatch(fetchInviteeInvitations({ id: user.id }))
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
                <Box key={group._id}>
                  <StyledListItem
                    key={group._id}
                    editHandler={() => openEditGroupModal({ id: group._id })}
                    removeHandler={() => removeGroup({ groupId: group._id })}
                  >
                    <GroupListItemContent group={group} />
                  </StyledListItem>
                  <Paper style={{ padding: 15, marginBottom: 20 }}>
                    <InviteUser groupId={group._id} />
                    <Stack direction="row" spacing={1}>
                      {group.members.map((member: IUser) => {
                        return (
                          <Chip
                            key={member.id}
                            label={member.displayName}
                            onDoubleClick={() =>
                              removeGroupMember({ memberId: member.id, _id: group._id })
                            }
                            title="Doubleclick to delete"
                          />
                        )
                      })}
                    </Stack>
                  </Paper>
                </Box>
              )
            })}
          </StyledList>
        </Grid>
        <Grid item sm={6} style={{ paddingLeft: 15 }}>
          <ContainerTitle>Your invitations</ContainerTitle>
          <StyledList>
            {invitations.map((invitation) => {
              return (
                <StyledListItem
                  key={invitation._id}
                  editHandler={() => {}}
                  removeHandler={() => removeInvitation({ invitationId: invitation._id })}
                >
                  {invitation._id}
                </StyledListItem>
              )
            })}
          </StyledList>

          <ContainerTitle>You were invited</ContainerTitle>
          <StyledList>
            {inviteeInvitations.map((invitation) => {
              return (
                <StyledListItem
                  key={invitation._id}
                  editHandler={() =>
                    acceptInvitation({ invitationId: invitation._id, groupId: invitation.groupId })
                  }
                  removeHandler={() => removeInvitation({ invitationId: invitation._id })}
                >
                  {invitation._id}
                </StyledListItem>
              )
            })}
          </StyledList>
        </Grid>
      </Grid>

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
