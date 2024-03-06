import { Chip, Paper, Stack } from '@mui/material'
import InviteUser from './InviteUser'
import { IGroup, IUser } from '../../../common/interfaces'
import { useAppDispatch } from '../../../redux/hooks'
import { removeGroupMemberById } from '../../../api'
import { fetchGroups } from '../../../redux/groups/groupsSlice'

const GroupMembers = ({ group }: { group: IGroup }) => {
  const dispatch = useAppDispatch()

  const removeGroupMember = ({ memberId, _id }: { memberId: string; _id: string }) => {
    removeGroupMemberById({ memberId, _id }).then(() => {
      dispatch(fetchGroups())
    })
  }

  return (
    <Paper style={{ padding: 15, marginBottom: 20 }}>
      <InviteUser groupId={group._id} />
      <Stack direction="row" spacing={1}>
        {group.members.map((member: IUser) => {
          return (
            <Chip
              key={member.id}
              label={member.displayName}
              onDoubleClick={() => removeGroupMember({ memberId: member.id, _id: group._id })}
              title="Doubleclick to delete"
            />
          )
        })}
      </Stack>
    </Paper>
  )
}

export default GroupMembers
