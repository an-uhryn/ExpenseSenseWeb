import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  data: any[]
  label: string
  onChange: (e: any) => void
  value: string[]
}

const StyledMultiselectDropdown = ({ value, data, label, onChange }: Props) => {
  return (
    <Box style={{ minWidth: 200, display: 'inline-flex' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={onChange}
          multiple
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

export default StyledMultiselectDropdown
