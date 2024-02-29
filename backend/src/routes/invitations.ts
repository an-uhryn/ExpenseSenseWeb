import express, { NextFunction, Request, Response, Router } from 'express'
import { getAllInvitations, createInvitation, deleteInvitationById, updateInvitationById } from '../controllers/invitationController'

const router: Router = express.Router()

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.use(authorizeUser)

router.get('/', getAllInvitations)
router.post('/', createInvitation)
router.delete('/:id', deleteInvitationById)
router.patch('/:id', updateInvitationById)

export default router
