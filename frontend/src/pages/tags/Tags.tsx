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

interface Tag {
  name: string
  color: string
  _id: string
}

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [dense, setDense] = useState(false)
  const [secondary, setSecondary] = useState(false)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#000')
  const [icon, setIcon] = useState('fastfood')

  const [tagToRemove, settagToRemove] = useState<string>('')

  const handleClickOpen = (tag: Tag) => {
    settagToRemove(tag._id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const fetchTags = () => {
    fetch('http://localhost:4000/api/tags/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong')
      })
      .then((res) => {
        setTags(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addTag = () => {
    fetch('http://localhost:4000/api/tags/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, color, icon }),
    })
      .then((res) => {
        fetchTags()
      })
      .catch((error) => {
        fetchTags()
        console.log(error)
      })
  }

  const removeTag = (tagId: string) => {
    fetch(`http://localhost:4000/api/tags/${tagId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        fetchTags()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Tags
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
          <Box style={{ display: 'inline-flex' }}>
            <HexColorPicker color={color} onChange={setColor} style={{ width: 300, height: 56 }} />
          </Box>

          <Button variant="contained" color="success" style={{ height: 56 }} onClick={addTag}>
            Add tag
          </Button>
        </Box>

        <List dense={dense}>
          {tags.map((tag) => {
            return (
              <ListItem
                key={tag._id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleClickOpen(tag)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar style={{ background: 'transparent' }}>
                    {/*<AttachMoney style={{ color: tag.color }} />*/}
                    <Icon style={{ color: tag.color }}>tag</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={tag.name} />
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
            Do you really want to remove this tag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              removeTag(tagToRemove)
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

export default Tags
