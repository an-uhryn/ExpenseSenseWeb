import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const PageHeaderBox = ({ children }: Props) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ display: 'flex', columnGap: 30, marginBottom: 30 }}
    >
      {children}
    </Box>
  )
}

export default PageHeaderBox
