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

export interface IEditCategory {
  name: string
  description: string
  color: string
  icon: string
  _id: string
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
