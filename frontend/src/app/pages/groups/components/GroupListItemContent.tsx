import { ListItemText, Typography } from '@mui/material'
import { formatDate, setDefaultGroup } from '../../../common/helpers'
import { IGroup } from '../../../common/interfaces'
import StyledButton from '../../../common/components/StyledButton'

interface Props {
  group: IGroup
}

const GroupListItemContent = ({ group }: Props) => {
  return (
    <>
      <ListItemText primary={group.name} />
      <Typography>{formatDate(group.createdAt)}</Typography>
      <StyledButton onClick={() => setDefaultGroup(group._id)}>Set default</StyledButton>
    </>
  )
}

export default GroupListItemContent
