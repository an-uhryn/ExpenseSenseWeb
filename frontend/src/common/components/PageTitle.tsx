import { Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const PageTitle = ({ children }: Props) => {
  return (
    <Typography style={{ margin: '20px 0' }} variant="h6" component="div">
      {children}
    </Typography>
  )
}

export default PageTitle
