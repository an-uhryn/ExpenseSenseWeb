import { ReactNode } from 'react'
import { Grid } from '@mui/material'

interface Props {
  children: ReactNode
}

const PageContainer = ({ children }: Props) => {
  return (
    <Grid item xs={12} md={6}>
      {children}
    </Grid>
  )
}

export default PageContainer
