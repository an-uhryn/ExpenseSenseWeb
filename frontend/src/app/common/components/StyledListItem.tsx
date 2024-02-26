import { IconButton, ListItem, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  removeHandler: () => void
}

const StyledListItem = ({ children, removeHandler }: Props) => {
  return (
    <ListItem
      style={{
        boxShadow: '1px 1px 5px #ddd',
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
      secondaryAction={
        <Tooltip title="Doubleclick to delete record">
          <IconButton edge="end" aria-label="delete" onDoubleClick={removeHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      }
    >
      {children}
    </ListItem>
  )
}

export default StyledListItem
