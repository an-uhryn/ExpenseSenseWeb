import StyledListItem from '../../../components/StyledListItem'
import StyledList from '../../../components/StyledList'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectInviteeInvitations } from '../../../redux/invitations/selectors'
import { acceptInvitationById, removeInvitationById } from '../../../api'
import { fetchGroups } from '../../../redux/groups/groupsSlice'
import { fetchInviteeInvitations } from '../../../redux/invitations/invitationsSlice'
import { selectUser } from '../../../redux/user/selectors'
import { useEffect } from 'react'

const InviteeList = () => {
  const dispatch = useAppDispatch()
  const inviteeInvitations = useAppSelector(selectInviteeInvitations)
  const user = useAppSelector(selectUser)

  const acceptInvitation = ({
    invitationId,
    groupId,
  }: {
    invitationId: string
    groupId: string
  }) => {
    acceptInvitationById({ id: invitationId, groupId }).then(() => {
      dispatch(fetchGroups())
      dispatch(fetchInviteeInvitations({ id: user.id }))
    })
  }

  const rejectInvitation = ({ invitationId }: { invitationId: string }) => {
    removeInvitationById({ invitationId })
      .then(() => {
        dispatch(fetchGroups())
        dispatch(fetchInviteeInvitations({ id: user.id }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchGroups())
    dispatch(fetchInviteeInvitations({ id: user.id }))
  }, [])

  return (
    <StyledList>
      {inviteeInvitations.map((invitation) => {
        return (
          <StyledListItem
            key={invitation._id}
            acceptHandler={() =>
              acceptInvitation({ invitationId: invitation._id, groupId: invitation.groupId })
            }
            removeHandler={() => rejectInvitation({ invitationId: invitation._id })}
          >
            {invitation._id}
          </StyledListItem>
        )
      })}
    </StyledList>
  )
}

export default InviteeList
