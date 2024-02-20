import {Avatar, ListItemAvatar, ListItemText, Typography} from '@mui/material'
import Icon from '@mui/material/Icon'
import { ITag } from '../../../common/interfaces'
import {formatDate} from "../../../common/helpers";

interface Props {
  tag: ITag
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
      <Typography>{formatDate(tag.createdAt)}</Typography>
    </>
  )
}

export default TagListItemContent
