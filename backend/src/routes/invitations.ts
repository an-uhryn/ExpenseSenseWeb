import express, { Router } from 'express'
import {
  getAllInvitations,
  createInvitation,
  deleteInvitationById,
  updateInvitationById,
  getAllInvitationsById,
  acceptInvitationById,
} from '../controllers/invitationController'
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware'

const router: Router = express.Router()

router.use(isAuthorizedMiddleware)

router.get('/', getAllInvitations)
router.get('/:id', getAllInvitationsById)
router.patch('/accept/:id', acceptInvitationById)
router.post('/', createInvitation)
router.delete('/:id', deleteInvitationById)
router.patch('/:id', updateInvitationById)

export default router
