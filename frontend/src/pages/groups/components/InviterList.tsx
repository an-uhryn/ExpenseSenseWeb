import StyledListItem from '../../../components/StyledListItem'
import StyledList from '../../../components/StyledList'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectAllInvitations } from '../../../redux/invitations/selectors'
import { removeInvitationById } from '../../../api'
import { fetchInvitations } from '../../../redux/invitations/invitationsSlice'
import { useEffect } from 'react'

const InviterList = () => {
  const dispatch = useAppDispatch()
  const invitations = useAppSelector(selectAllInvitations)

  const removeInvitation = ({ invitationId }: { invitationId: string }) => {
    removeInvitationById({ invitationId })
      .then(() => {
        dispatch(fetchInvitations())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    dispatch(fetchInvitations())
  }, [])

  return (
    <StyledList>
      {invitations.map((invitation) => {
        return (
          <StyledListItem
            key={invitation._id}
            removeHandler={() => removeInvitation({ invitationId: invitation._id })}
          >
            {invitation._id}
          </StyledListItem>
        )
      })}
    </StyledList>
  )
}

export default InviterList
