import express, { NextFunction, Request, Response, Router } from 'express'
import { getAllGroups, createGroup, deleteGroupById, updateGroupById } from '../controllers/groupController'

const router: Router = express.Router()

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

router.use(authorizeUser)

router.get('/', getAllGroups)
router.post('/', createGroup)
router.delete('/:id', deleteGroupById)
router.patch('/:id', updateGroupById)

export default router
