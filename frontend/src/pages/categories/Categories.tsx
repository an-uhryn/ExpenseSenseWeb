import { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  Typography,
  IconButton,
  ListItemAvatar,
  Avatar,
  Grid,
  ListItemText,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import Icon from '@mui/material/Icon'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachMoney from '@mui/icons-material/AttachMoney'
import { HexColorPicker } from 'react-colorful'

interface Category {
  name: string
  description: string
  color: string
  _id: string
  icon: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [dense, setDense] = useState(false)
  const [secondary, setSecondary] = useState(false)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')

  const [categoryToRemove, setCategoryToRemove] = useState<string>('')

  const handleClickOpen = (category: Category) => {
    setCategoryToRemove(category._id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchCategories = () => {
    fetch('http://localhost:4000/api/categories/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        setCategories(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addCategory = () => {
    fetch('http://localhost:4000/api/categories/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, color, icon }),
    })
      .then((res) => {
        fetchCategories()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeCategory = (categoryId: string) => {
    fetch(`http://localhost:4000/api/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        fetchCategories()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Categories
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          style={{ display: 'flex', columnGap: 30, marginBottom: 30 }}
        >
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
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="medium"
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <Box style={{ display: 'inline-flex' }}>
            <HexColorPicker color={color} onChange={setColor} style={{ width: 300, height: 56 }} />
          </Box>

          <Button variant="contained" color="success" style={{ height: 56 }} onClick={addCategory}>
            Add category
          </Button>
        </Box>

        <List dense={dense}>
          {categories.map((category) => {
            return (
              <ListItem
                key={category._id}
                style={{
                  boxShadow: '1px 1px 5px #ddd',
                  marginBottom: 10,
                  borderRadius: 4,
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleClickOpen(category)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background: 'transparent',
                      border: `1px solid ${category.color}`,
                    }}
                  >
                    {/*<AttachMoney style={{ color: category.color }} />*/}
                    <Icon style={{ color: category.color }}>{category.icon}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={category.name} secondary={category.description} />
              </ListItem>
            )
          })}
        </List>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              removeCategory(categoryToRemove)
              handleClose()
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Categories
