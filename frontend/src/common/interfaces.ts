export interface ICategory {
  name: string
  description: string
  color: string
  _id: string
  icon: string
}

export interface ITag {
  name: string
  color: string
  _id: string
}

export interface IAddTag {
  name: string
  color: string
}

export interface IRemoveTag {
  tagId: string
}

export interface IAddCategories {
  name: string
  description: string
  color: string
  icon: string
}

export interface IRemoveCategoryById {
  categoryId: string
}

export interface IExpense {
  name: string
  description: string
  value: string
  categoryId: string
  tagIds: string[]
  _id: string
}

export interface IAddExpense {
  name: string
  description: string
  value: string
  categoryId: string
  tagIds: string[]
}

export interface IRemoveExpense {
  expenseId: string
}
