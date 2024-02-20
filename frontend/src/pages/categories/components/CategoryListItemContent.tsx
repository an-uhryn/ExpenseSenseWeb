import { Avatar, ListItemAvatar, ListItemText } from '@mui/material'
import Icon from '@mui/material/Icon'
import { Category } from '../../../common/interfaces'

interface Props {
  category: Category
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
    </>
  )
}

export default CategoryListItemContent
