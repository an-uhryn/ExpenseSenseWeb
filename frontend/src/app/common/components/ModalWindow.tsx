import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectModalState } from '../../redux/modal/selectors'
import { setModalState } from '../../redux/modal/modalSlice'
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ModalWindow = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector(selectModalState)
  const handleClose = () => dispatch(setModalState(false))

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  )
}

export default ModalWindow
