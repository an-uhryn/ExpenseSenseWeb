import express, { Router } from 'express'
import { getAllTags, createTag, deleteTagById, updateTagById } from '../controllers/tagController'

const router: Router = express.Router()

router.get('/', getAllTags)
router.post('/', createTag)
router.delete('/:id', deleteTagById)
router.patch('/:id', updateTagById)

export default router
