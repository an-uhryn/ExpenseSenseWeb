import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

interface Props {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const StyledTextField = ({ label, onChange }: Props) => {
  return <TextField id="outlined-basic" label={label} variant="outlined" onChange={onChange} />
}

export default StyledTextField
