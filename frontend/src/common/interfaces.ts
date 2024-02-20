export interface Category {
  name: string
  description: string
  color: string
  _id: string
  icon: string
}

export interface Tag {
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
