import { ReactNode } from 'react'
import { List } from '@mui/material'

interface Props {
  children: ReactNode
}

const StyledList = ({ children }: Props) => {
  return <List>{children}</List>
}

export default StyledList
