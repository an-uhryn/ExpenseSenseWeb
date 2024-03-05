import { Button } from '@mui/material'
import { ReactNode, MouseEventHandler } from 'react'

interface Props {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const StyledButton = ({ children, onClick }: Props) => {
  return (
    <Button variant="contained" color="success" style={{ height: 56 }} onClick={onClick}>
      {children}
    </Button>
  )
}

export default StyledButton
