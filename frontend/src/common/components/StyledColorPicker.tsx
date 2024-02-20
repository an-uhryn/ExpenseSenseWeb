import { HexColorPicker } from 'react-colorful'
import { Box } from '@mui/material'

interface Props {
  color: string
  onChange: (newColor: string) => void
}

const StyledColorPicker = ({ color, onChange }: Props) => {
  return (
    <Box style={{ display: 'inline-flex' }}>
      <HexColorPicker color={color} onChange={onChange} style={{ width: 300, height: 56 }} />
    </Box>
  )
}

export default StyledColorPicker
