import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import { useEffect, useState } from 'react'
import { ICategory, IExpense, ITag } from '../../common/interfaces'
import { getCategories, getExpenses, getTags } from '../../api'
import { PieChart } from '@mui/x-charts/PieChart'
import {Card, Grid, Typography} from "@mui/material";
import StyledList from "../../common/components/StyledList";
import StyledListItem from "../../common/components/StyledListItem";

interface ExpensesByCategory {
  [category: string]: IExpense[]
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [tags, setTags] = useState<ITag[]>([])
  const [chartData, setChartData] = useState<{ id: number; value: number; label: string }[]>([])
  const [sortedExpenses, setSortedExpenses] = useState<ExpensesByCategory>({})

  const getCategoryName = (categoryId: string) => {
    return categories.find((category: ICategory) => category._id === categoryId)?.name || 'Unknown'
  }

  const combineDataset = () => {
    const expensesSortedByCategory: ExpensesByCategory = {}
    const dataset: { id: number; value: number; label: string }[] = []

    expenses.map((expense: IExpense) => {
      if (expensesSortedByCategory[getCategoryName(expense.categoryId)]) {
        expensesSortedByCategory[getCategoryName(expense.categoryId)].push(expense)
      } else {
        expensesSortedByCategory[getCategoryName(expense.categoryId)] = [expense]
      }
    })

    for (const [key, value] of Object.entries(expensesSortedByCategory)) {
      const sum = value.reduce((total, currentValue) => {
        return total + currentValue.value
      }, 0)

      dataset.push({
        id: dataset.length,
        value: sum,
        label: `${key} - ${sum} CZK`,
      })
    }

    dataset.sort((a, b) => {
      return b.value - a.value
    })

    setChartData(dataset)
    setSortedExpenses(expensesSortedByCategory)
  }

  useEffect(() => {
    Promise.all([getExpenses(), getCategories(), getTags()]).then((values) => {
      const [e, c, t] = values

      setExpenses(e)
      setCategories(c)
      setTags(t)
    })
  }, [])

  useEffect(() => {
    if (expenses.length && categories.length && tags.length) {
      combineDataset()
    }
  }, [expenses, categories, tags])

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <Grid container gap={3}>
        <Grid xs={12}>
          <PieChart
            series={[
              {
                data: chartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
              },
            ]}
            width={800}
            height={400}
          />
        </Grid>

        <Grid xs={12}>
          {
            Object.entries(sortedExpenses).map(([key, value]) => {
              return (
                <Grid container>
                  <Grid xs={12}>
                  <Typography variant='h6'>{key}</Typography>
                  <StyledList>
                    {
                      value.map((expense: IExpense) => {
                        return (
                          <StyledListItem key={expense._id} removeHandler={() => {}}>{expense.name} - {expense.value}</StyledListItem>
                        )
                      })
                    }
                  </StyledList>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      </Grid>
      <Card>

      </Card>

    </PageContainer>
  )
}

export default Dashboard
