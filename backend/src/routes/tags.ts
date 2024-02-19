import {response} from "express";

const express = require('express')
const router = express.Router()

const Tag = require('../models/tagModel')

router.get('/', async (req:any, res:any) => {
  const tag = await Tag.find({})
  res.status(200).json(tag)
})

router.delete('/:id', async (req:any, res:any) => {
  const { id } = req.params
  const tag = await Tag.findOneAndDelete({ _id: id })
  res.status(200).json(tag)
})

router.post('/', (req:any, res:any) => {
  const { name, description, color, icon } = req.body
  try {
    const tag = Tag.create({ name, color })
    res.status(200).json(tag)
  } catch (error: any) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router
