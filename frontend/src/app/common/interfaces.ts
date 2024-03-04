export interface ICategory {
  name: string
  description: string
  color: string
  _id: string
  icon: string
  createdAt: Date
}

export interface ITag {
  name: string
  color: string
  _id: string
  createdAt: Date
}

export interface IAddTag {
  name: string
  color: string
  groupId?: string
}

export interface IRemoveTag {
  tagId: string
}

export interface IEditTag {
  name: string
  color: string
  _id: string
  groupId: string
}

export interface IAddCategories {
  name: string
  description: string
  color: string
  icon: string
  groupId?: string
}

export interface IEditCategory {
  name: string
  description: string
  color: string
  icon: string
  _id: string
  groupId: string
}

export interface IRemoveCategoryById {
  categoryId: string
}

export interface IExpense {
  name: string
  description: string
  value: number
  categoryId: string
  tagIds: string[]
  _id: string
  createdAt: Date
}

export interface IAddExpense {
  name: string
  description: string
  value: string
  categoryId: string
  tagIds: string[]
  groupId?: string
}

export interface IEditExpense {
  name: string
  description: string
  value: string
  categoryId: string
  tagIds: string[]
  _id: string
}

export interface IRemoveExpense {
  expenseId: string
}

export interface IExpensesByCategories {
  [category: string]: IExpense[]
}

export interface IExpensesByTags {
  [tag: string]: IExpense[]
}

export interface IChartDatasetItem {
  id: number
  value: number
  label: string
}

export interface IGroup {
  name: string
  userId: string
  members: IUser[]
  _id: string
  createdAt: Date
}

export interface IInvitation {
  invitee: string
  inviter: string
  groupId: string
  _id: string
}

export interface IUser {
  displayName: string
  emails: { value: string }[]
  id: string
  name: { familyName: string; givenName: string }
  photos: { value: string }[]
  provider: string
  _json?: any
  _raw?: string
}
