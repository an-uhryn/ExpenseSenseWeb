import { Box, Typography } from '@mui/material'
import PageContainer from '../../components/PageContainer'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectUserIsAuthorized } from '../../redux/user/selectors'
import Authorized from './components/Authorized'
import Authorize from './components/Authorize'

const Login = () => {
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  return (
    <PageContainer>
      <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50 }}>
        <img src="/images/ExpenseSense.png" width={200} height={200} alt="Logo" />
        <Typography variant="h4" padding={3}>
          ExpenseSense
        </Typography>
        <Typography variant="h6">Welcome to ExpenseSense app.</Typography>
        {isAuthorized ? <Authorized /> : <Authorize />}
      </Box>
    </PageContainer>
  )
}

export default Login
