import express, { NextFunction, Request, Response, Router } from 'express'
import { getAllTags, createTag, deleteTagById, updateTagById } from '../controllers/tagController'

const router: Router = express.Router()

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.use(authorizeUser)

router.get('/', getAllTags)
router.post('/', createTag)
router.delete('/:id', deleteTagById)
router.patch('/:id', updateTagById)

export default router
