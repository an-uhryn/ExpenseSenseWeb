import dayjs from 'dayjs'
import {
  ICategory,
  IChartDatasetItem,
  IExpense,
  IExpensesByCategories,
  IExpensesByTags,
  ITag,
} from './interfaces'

export const formatDate = (date: Date) => {
  return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
}

export const separateExpensesByCategories = (
  expenses: IExpense[],
  categories: ICategory[],
): IExpensesByCategories => {
  const expensesSortedByCategory: IExpensesByCategories = {}

  expenses.map((expense: IExpense) => {
    if (expensesSortedByCategory[getCategoryName(categories, expense.categoryId)]) {
      expensesSortedByCategory[getCategoryName(categories, expense.categoryId)].push(expense)
    } else {
      expensesSortedByCategory[getCategoryName(categories, expense.categoryId)] = [expense]
    }
  })

  return expensesSortedByCategory
}

export const separateExpensesByTags = (
  expenses: IExpense[],
  tags: ITag[],
): IExpensesByCategories => {
  const expensesSortedByCategory: IExpensesByTags = {}

  expenses.map((expense: IExpense) => {
    const tagsQuantity = expense.tagIds.length

    if (tagsQuantity) {
      const sumForOneTag = expense.value / tagsQuantity

      expense.tagIds.forEach((tag: string) => {
        if (expensesSortedByCategory[getExpenseTags(tags, tag)]) {
          expensesSortedByCategory[getExpenseTags(tags, tag)].push({
            ...expense,
            value: sumForOneTag,
          })
        } else {
          expensesSortedByCategory[getExpenseTags(tags, tag)] = [
            { ...expense, value: sumForOneTag },
          ]
        }
      })
    }
  })

  return expensesSortedByCategory
}

const getCategoryName = (categories: ICategory[], categoryId: string): string => {
  return categories.find((category: ICategory) => category._id === categoryId)?.name || 'Unknown'
}

const getExpenseTags = (tags: ITag[], expenseTag: string): string => {
  return tags.find((tag: ITag) => tag._id === expenseTag)?.name || 'Unknown'
}

export const generateDatasetForPieChart = (
  separatedExpenses: IExpensesByTags | IExpensesByCategories,
) => {
  const dataset: IChartDatasetItem[] = []

  for (const [key, value] of Object.entries(separatedExpenses)) {
    const sum = value.reduce((total: number, currentValue: IExpense) => {
      return total + currentValue.value
    }, 0)

    dataset.push({
      id: dataset.length,
      value: sum,
      label: `${key} - ${sum} CZK`,
    })
  }

  dataset.sort((a: IChartDatasetItem, b: IChartDatasetItem) => {
    return b.value - a.value
  })

  return dataset
}

export const setDefaultGroup = (groupId: string) => {
  localStorage.setItem('groupId', groupId)
}

export const getDefaultGroup = () => {
  return localStorage.getItem('groupId')
}
