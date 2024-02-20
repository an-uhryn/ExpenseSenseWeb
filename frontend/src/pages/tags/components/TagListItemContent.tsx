import { Avatar, ListItemAvatar, ListItemText } from '@mui/material'
import Icon from '@mui/material/Icon'
import { Tag } from '../../../common/interfaces'

interface Props {
  tag: Tag
}

const TagListItemContent = ({ tag }: Props) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar style={{ background: 'transparent' }}>
          <Icon style={{ color: tag.color }}>tag</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={tag.name} />
    </>
  )
}

export default TagListItemContent
