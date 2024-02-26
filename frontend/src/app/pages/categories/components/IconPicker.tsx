import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Icon from '@mui/material/Icon'

interface Props {
  icon: string
  setIcon: (icon: string) => void
}

const IconPicker = ({ icon, setIcon }: Props) => {
  return (
    <Box style={{ maxWidth: 100, display: 'inline-flex' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Icon</InputLabel>
        <Select
          style={{ height: 56 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={icon}
          label="Age"
          onChange={(e) => setIcon(e.target.value)}
        >
          <MenuItem value={'fastfood'}>
            <Icon>fastfood</Icon>
          </MenuItem>
          <MenuItem value={'restaurant'}>
            <Icon>restaurant</Icon>
          </MenuItem>
          <MenuItem value={'cake'}>
            <Icon>cake</Icon>
          </MenuItem>
          <MenuItem value={'icecream'}>
            <Icon>icecream</Icon>
          </MenuItem>
          <MenuItem value={'local_grocery_store'}>
            <Icon>local_grocery_store</Icon>
          </MenuItem>
          <MenuItem value={'favorite'}>
            <Icon>favorite</Icon>
          </MenuItem>
          <MenuItem value={'fitness_center'}>
            <Icon>fitness_center</Icon>
          </MenuItem>
          <MenuItem value={'medical_services'}>
            <Icon>medical_services</Icon>
          </MenuItem>
          <MenuItem value={'checkroom'}>
            <Icon>checkroom</Icon>
          </MenuItem>
          <MenuItem value={'videogame_asset'}>
            <Icon>videogame_asset</Icon>
          </MenuItem>
          <MenuItem value={'local_taxi'}>
            <Icon>local_taxi</Icon>
          </MenuItem>
          <MenuItem value={'tram'}>
            <Icon>tram</Icon>
          </MenuItem>
          <MenuItem value={'gavel'}>
            <Icon>gavel</Icon>
          </MenuItem>
          <MenuItem value={'pets'}>
            <Icon>pets</Icon>
          </MenuItem>
          <MenuItem value={'child_care'}>
            <Icon>child_care</Icon>
          </MenuItem>
          <MenuItem value={'child_friendly'}>
            <Icon>child_friendly</Icon>
          </MenuItem>
          <MenuItem value={'car_crash'}>
            <Icon>car_crash</Icon>
          </MenuItem>
          <MenuItem value={'redeem'}>
            <Icon>redeem</Icon>
          </MenuItem>
          <MenuItem value={'local_bar'}>
            <Icon>local_bar</Icon>
          </MenuItem>
          <MenuItem value={'local_cafe'}>
            <Icon>local_cafe</Icon>
          </MenuItem>
          <MenuItem value={'home'}>
            <Icon>home</Icon>
          </MenuItem>
          <MenuItem value={'local_airport'}>
            <Icon>local_airport</Icon>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default IconPicker
