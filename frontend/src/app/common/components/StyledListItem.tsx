import { IconButton, ListItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  editHandler: () => void
  removeHandler: () => void
}

const StyledListItem = ({ children, editHandler, removeHandler }: Props) => {
  return (
    <ListItem
      style={{
        boxShadow: '1px 1px 5px #ddd',
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
        columnGap: 15,
      }}
    >
      {children}
      <IconButton edge="end" aria-label="delete" onClick={editHandler}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onDoubleClick={removeHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default StyledListItem
