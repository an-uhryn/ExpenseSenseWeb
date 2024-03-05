import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { addInvitation } from '../../../api'
import { useAppDispatch } from '../../../redux/hooks'
import { fetchInvitations } from '../../../redux/invitations/invitationsSlice'

interface Props {
  groupId: string
}

const InviteUser = ({ groupId }: Props) => {
  const dispatch = useAppDispatch()
  const [invitee, setInvitee] = useState('')

  const createInvitation = () => {
    addInvitation({ invitee, groupId }).then(() => {
      dispatch(fetchInvitations())
    })
  }

  return (
    <Box style={{ marginBottom: 20 }}>
      <TextField
        id="outlined-basic"
        size="small"
        label="Invitee id"
        variant="outlined"
        value={invitee}
        onChange={(event) => setInvitee(event.target.value)}
      />
      <Button
        variant="contained"
        color="success"
        size="medium"
        onClick={createInvitation}
        style={{ marginLeft: 20 }}
      >
        Invite user
      </Button>
    </Box>
  )
}

export default InviteUser
