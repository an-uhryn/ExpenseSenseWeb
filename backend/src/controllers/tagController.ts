import { Request, Response } from 'express'
import { Tag } from '../models/tagModel'

export const getAllTags = async (req:Request, res:Response) => {
  try {
    const tag = await Tag.find({})
    res.status(200).json(tag)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createTag = async (req:Request, res:Response) => {
  const { name, color } = req.body
  try {
    const tag = await Tag.create({ name, color })
    res.status(201).json(tag)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteTagById = async (req:Request, res:Response) => {
  const { id } = req.params
  try {
    const tag = await Tag.findByIdAndDelete(id)
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' })
      return
    }
    res.status(200).json(tag)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
