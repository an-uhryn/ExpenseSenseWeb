import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  data: any[]
  value: string
  label: string
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const StyledDropdown = ({ data, value, label, onChange }: Props) => {
  return (
    <Box style={{ maxWidth: 150, display: 'inline-flex' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={onChange}
        >
          {data.map((item) => {
            return (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default StyledDropdown
