import express, { Router } from 'express'
import {
  getAllGroups,
  createGroup,
  deleteGroupById,
  updateGroupById,
  removeGroupMember,
} from '../controllers/groupController'
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware'

const router: Router = express.Router()

router.use(isAuthorizedMiddleware)

router.get('/', getAllGroups)
router.post('/', createGroup)
router.delete('/:id', deleteGroupById)
router.patch('/:id', updateGroupById)
router.patch('/remove/:id', removeGroupMember)

export default router
