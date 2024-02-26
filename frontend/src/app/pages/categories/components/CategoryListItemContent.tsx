import { Avatar, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import Icon from '@mui/material/Icon'
import { ICategory } from '../../../common/interfaces'
import { formatDate } from '../../../common/helpers'

interface Props {
  category: ICategory
}

const CategoryListItemContent = ({ category }: Props) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          style={{
            background: 'transparent',
            border: `1px solid ${category.color}`,
          }}
        >
          <Icon style={{ color: category.color }}>{category.icon}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={category.name} secondary={category.description} />
      <Typography>{formatDate(category.createdAt)}</Typography>
    </>
  )
}

export default CategoryListItemContent
