import QRCode from 'react-qr-code'
import PageContainer from '../../components/PageContainer'
import PageTitle from '../../components/PageTitle'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/user/selectors'
import { Avatar, Grid } from '@mui/material'
import ContainerTitle from '../../components/ContainerTitle'
import UserInfo from './components/UserInfo'

const Profile = () => {
  const user = useAppSelector(selectUser)

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
          <UserInfo />
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
