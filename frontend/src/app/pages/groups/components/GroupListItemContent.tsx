import { ListItemText, Typography } from '@mui/material'
import { formatDate } from '../../../common/helpers'
import { IGroup } from '../../../common/interfaces'

interface Props {
  group: IGroup
}

const GroupListItemContent = ({ group }: Props) => {
  return (
    <>
      <ListItemText primary={group.name} />
      <Typography>{formatDate(group.createdAt)}</Typography>
    </>
  )
}

export default GroupListItemContent
