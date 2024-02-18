import {useEffect, useState} from "react"
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
  TextField, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import AttachMoney from '@mui/icons-material/AttachMoney'
import { HexColorPicker } from "react-colorful"

interface Category {
  name: string
  description: string
  color: string
  _id: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')

  const [categoryToRemove, setCategoryToRemove] = useState<string>('')

  const handleClickOpen = (category: Category) => {
    setCategoryToRemove(category._id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCategories = () => {
    fetch('http://localhost:4000/api/categories/',).then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Something went wrong');
    }).then((res) => {
      setCategories(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  const addCategory = () => {
    fetch('http://localhost:4000/api/categories/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, description, color, icon: 'smile'})
    }).then((res) => {
      fetchCategories()
    }).catch((error) => {
      console.log(error)
    })
  }

  const removeCategory = (categoryId: string) => {
    fetch(`http://localhost:4000/api/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      fetchCategories()
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchCategories()
  },[])

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Categories
        </Typography>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
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
            size='medium'
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <Box style={{display: 'inline-flex'}}>
            <HexColorPicker color={color} onChange={setColor} style={{ width: 300, height: 56}} />
          </Box>

          <Button
            variant="contained"
            color='success'
            style={{ height: 56 }}
            onClick={ addCategory }
          >
            Contained
          </Button>
        </Box>

        <List dense={dense}>
          {
            categories.map((category) => {
              return (
                <ListItem
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
                    <Avatar>
                      <AttachMoney style={{ color: category.color }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={category.name}
                    secondary={category.description}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => {
            removeCategory(categoryToRemove)
            handleClose()
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Categories
