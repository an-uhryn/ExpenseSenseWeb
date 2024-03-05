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

export const addCategory = async ({ name, description, color, icon, groupId }: IAddCategories) => {
  const response = await fetch(`${baseApiUrl}/categories/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, color, icon, groupId }),
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

export const editCategoryById = async ({
  name,
  description,
  color,
  icon,
  _id,
  groupId,
}: IEditCategory) => {
  return await fetch(`${baseApiUrl}/categories/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, color, icon, groupId }),
    credentials: 'include',
  })
}

export const getTags = async () => {
  const response = await fetch(`${baseApiUrl}/tags/`, {
    credentials: 'include',
  })
  return response.json()
}

export const addTag = async ({ name, color, groupId }: IAddTag) => {
  const response = await fetch(`${baseApiUrl}/tags/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color, groupId }),
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

export const editTagById = async ({ name, color, _id, groupId }: IEditTag) => {
  return await fetch(`${baseApiUrl}/tags/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color, groupId }),
    credentials: 'include',
  })
}

export const getExpenses = async () => {
  const response = await fetch(`${baseApiUrl}/expenses/`, {
    credentials: 'include',
  })
  return response.json()
}

export const addExpense = async ({
  name,
  description,
  value,
  categoryId,
  tagIds,
  groupId,
}: IAddExpense) => {
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
      groupId,
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

export const getGroups = async () => {
  const response = await fetch(`${baseApiUrl}/groups/`, {
    credentials: 'include',
  })
  return response.json()
}

export const addGroup = async ({ name }: { name: string }) => {
  const response = await fetch(`${baseApiUrl}/groups/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
    credentials: 'include',
  })
  return response.json()
}

export const removeGroupById = async ({ groupId }: { groupId: string }) => {
  return await fetch(`${baseApiUrl}/groups/${groupId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}

export const editGroupById = async ({ name, _id }: { name: string; _id: string }) => {
  return await fetch(`${baseApiUrl}/groups/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
    credentials: 'include',
  })
}

export const removeGroupMemberById = async ({
  memberId,
  _id,
}: {
  memberId: string
  _id: string
}) => {
  return await fetch(`${baseApiUrl}/groups/remove/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memberId }),
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

export const getInvitations = async () => {
  const response = await fetch(`${baseApiUrl}/invitations/`, {
    credentials: 'include',
  })
  return response.json()
}

export const getInviteeInvitations = async ({ id }: { id: string }) => {
  const response = await fetch(`${baseApiUrl}/invitations/${id}`, {
    credentials: 'include',
  })
  return response.json()
}

export const acceptInvitationById = async ({ id, groupId }: { id: string; groupId: string }) => {
  const response = await fetch(`${baseApiUrl}/invitations/accept/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ groupId }),
  })
  return response.json()
}

export const addInvitation = async ({ invitee, groupId }: { invitee: string; groupId: string }) => {
  const response = await fetch(`${baseApiUrl}/invitations/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ invitee, groupId }),
    credentials: 'include',
  })
  return response.json()
}

export const removeInvitationById = async ({ invitationId }: { invitationId: string }) => {
  return await fetch(`${baseApiUrl}/invitations/${invitationId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}

export const editInvitationById = async ({ name, color, _id }: IEditTag) => {
  return await fetch(`${baseApiUrl}/invitations/${_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
    credentials: 'include',
  })
}
