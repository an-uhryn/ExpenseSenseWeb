import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useAppSelector } from '../../../redux/hooks'
import { selectUser } from '../../../redux/user/selectors'

const UserInfo = () => {
  const user = useAppSelector(selectUser)

  const handleCopyToClipboard = () => {
    const userId = user.id
    navigator.clipboard
      .writeText(userId)
      .then(() => {
        console.log('Text copied to clipboard successfully')
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error)
      })
  }

  return (
    <Paper>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={user.displayName} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={user.emails.map((obj) => obj.value).join(', ')} />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={handleCopyToClipboard}>
              <ContentCopyIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <ConnectWithoutContactIcon />
          </ListItemIcon>
          <ListItemText primary={user.id} />
        </ListItem>
      </List>
    </Paper>
  )
}

export default UserInfo
