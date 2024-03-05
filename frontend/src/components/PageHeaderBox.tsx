import { Box, Paper } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const PageHeaderBox = ({ children }: Props) => {
  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ display: 'flex', columnGap: 30 }}
      >
        {children}
      </Box>
    </Paper>
  )
}

export default PageHeaderBox
