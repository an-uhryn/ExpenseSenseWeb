import { IAddCategories, IAddTag, IRemoveCategoryById, IRemoveTag } from './common/interfaces'

const baseApiUrl = `http://localhost:4000/api`

export const getCategories = async () => {
  const response = await fetch(`${baseApiUrl}/categories/`)
  return response.json()
}

export const addCategory = async ({ name, description, color, icon }: IAddCategories) => {
  const response = await fetch(`${baseApiUrl}/categories/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, color, icon }),
  })
  return response.json()
}

export const removeCategoryById = async ({ categoryId }: IRemoveCategoryById) => {
  return await fetch(`${baseApiUrl}/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const getTags = async () => {
  const response = await fetch('http://localhost:4000/api/tags/')
  return response.json()
}

export const addTag = async ({ name, color }: IAddTag) => {
  const response = await fetch('http://localhost:4000/api/tags/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  })
  return response.json()
}

export const removeTagById = async ({ tagId }: IRemoveTag) => {
  return await fetch(`http://localhost:4000/api/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}
