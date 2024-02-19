import express, { Router } from 'express'
import { getAllTags, createTag, deleteTagById } from '../controllers/tagController'

const router: Router = express.Router()

router.get('/', getAllTags)
router.post('/', createTag)
router.delete('/:id', deleteTagById)

export default router
