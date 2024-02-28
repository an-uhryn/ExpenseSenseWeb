import {
  IAddCategories,
  IAddExpense,
  IAddTag,
  IEditCategory,
  IEditExpense,
  IEditTag,
  IRemoveCategoryById,
  IRemoveExpense,
  IRemoveTag,
} from './common/interfaces'

const baseApiUrl = `http://localhost:4000/api`

export const getCategories = async () => {
  const response = await fetch(`${baseApiUrl}/categories/`, {
    credentials: 'include',
  })
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
    credentials: 'include',
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
    credentials: 'include',
  })
}

export const editCategoryById = async ({ name, description, color, icon, _id }: IEditCategory) => {
  return await fetch(`${baseApiUrl}/categories/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, color, icon }),
    credentials: 'include',
  })
}

export const getTags = async () => {
  const response = await fetch(`${baseApiUrl}/tags/`, {
    credentials: 'include',
  })
  return response.json()
}

export const addTag = async ({ name, color }: IAddTag) => {
  const response = await fetch(`${baseApiUrl}/tags/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
    credentials: 'include',
  })
  return response.json()
}

export const removeTagById = async ({ tagId }: IRemoveTag) => {
  return await fetch(`${baseApiUrl}/tags/${tagId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}

export const editTagById = async ({ name, color, _id }: IEditTag) => {
  return await fetch(`${baseApiUrl}/tags/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
    credentials: 'include',
  })
}

export const getExpenses = async () => {
  const response = await fetch(`${baseApiUrl}/expenses/`, {
    credentials: 'include',
  })
  return response.json()
}

export const addExpense = async ({ name, description, value, categoryId, tagIds }: IAddExpense) => {
  const response = await fetch(`${baseApiUrl}/expenses/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      value,
      categoryId,
      tagIds,
    }),
    credentials: 'include',
  })
  return response.json()
}

export const removeExpenseById = async ({ expenseId }: IRemoveExpense) => {
  return await fetch(`${baseApiUrl}/expenses/${expenseId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}

export const editExpenseById = async ({
  name,
  description,
  value,
  categoryId,
  tagIds,
  _id,
}: IEditExpense) => {
  return await fetch(`${baseApiUrl}/expenses/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, value, categoryId, tagIds }),
    credentials: 'include',
  })
}

export const getUser = async () => {
  try {
    const response = await fetch(`http://localhost:4000/auth/login/success/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    // const response = await axios.get(`http://localhost:4000/auth/login/success/`, { withCredentials: true });
    // console.log(response.json())
    return response.json()
  } catch (e: any) {
    throw e
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`http://localhost:4000/auth/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return response.json()
  } catch (e: any) {
    throw e
  }
}
