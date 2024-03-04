import express, { Router } from 'express'
import {
  getAllTags,
  createTag,
  deleteTagById,
  updateTagById,
  getGroupTags,
} from '../controllers/tagController'
import { isAuthorizedMiddleware } from '../auth/isAuthorizedMiddleware'

const router: Router = express.Router()

router.use(isAuthorizedMiddleware)

router.get('/', getAllTags)
router.get('/group/:id', getGroupTags)
router.post('/', createTag)
router.delete('/:id', deleteTagById)
router.patch('/:id', updateTagById)

export default router
