import QRCode from 'react-qr-code'
import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/user/selectors'
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from '@mui/material'
import ContainerTitle from '../../common/components/ContainerTitle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'

const Profile = () => {
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
    <PageContainer>
      <PageTitle>User Profile</PageTitle>
      <Grid container style={{ marginTop: 100 }}>
        <Grid item xs={4}>
          <Avatar
            alt={user.displayName}
            src={user.photos[0].value}
            sx={{ width: 350, height: 350 }}
          />
        </Grid>
        <Grid item xs={4} style={{ padding: '0 50px' }}>
          <ContainerTitle>User info</ContainerTitle>
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
        </Grid>
        <Grid item xs={4}>
          <ContainerTitle>Invitation QR code</ContainerTitle>
          <QRCode value={user.id} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default Profile
