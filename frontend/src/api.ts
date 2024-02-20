// import 'dotenv/config'

// const baseApiUrl = `${process.env.BACKEND_HOST}/api`
const baseApiUrl = `http://localhost:4000/api`

interface IGetCategories {
  name: string
  description: string
  color: string
  icon: string
}

interface IRemoveCategoryById {
  categoryId: string
}

export const getCategories = async () => {
  const response = await fetch(`${baseApiUrl}/categories/`)
  return response.json()
}

export const addCategory = async ({ name, description, color, icon }: IGetCategories) => {
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
