import { IconButton, ListItem } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  editHandler?: () => void
  removeHandler: () => void
  acceptHandler?: () => void
}

const StyledListItem = ({ children, editHandler, removeHandler, acceptHandler }: Props) => {
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

      {editHandler && (
        <IconButton edge="end" aria-label="edit" onClick={editHandler}>
          <EditIcon />
        </IconButton>
      )}

      {acceptHandler && (
        <IconButton edge="end" aria-label="accept" onClick={acceptHandler}>
          <DoneIcon />
        </IconButton>
      )}

      <IconButton edge="end" aria-label="delete" onDoubleClick={removeHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default StyledListItem
