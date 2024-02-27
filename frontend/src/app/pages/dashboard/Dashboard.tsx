import PageContainer from '../../common/components/PageContainer'
import PageTitle from '../../common/components/PageTitle'
import { useEffect, useState } from 'react'
import {
  IChartDatasetItem,
  IExpense,
  IExpensesByCategories,
  IExpensesByTags,
  IRemoveExpense,
} from '../../common/interfaces'
import { removeExpenseById } from '../../api'
import { Grid, Typography, Paper } from '@mui/material'
import StyledList from '../../common/components/StyledList'
import StyledListItem from '../../common/components/StyledListItem'
import {
  generateDatasetForPieChart,
  separateExpensesByCategories,
  separateExpensesByTags,
} from '../../common/helpers'
import StyledPieChart from '../../common/components/StyledPieChart'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAllCategories } from '../../redux/categories/selectors'
import { selectAllTags } from '../../redux/tags/selectors'
import { selectAllExpenses } from '../../redux/expenses/selectors'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import { fetchTags } from '../../redux/tags/tagsSlice'
import { fetchExpenses } from '../../redux/expenses/expensesSlice'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectAllCategories)
  const tags = useAppSelector(selectAllTags)
  const expenses = useAppSelector(selectAllExpenses)
  const [categoriesChartData, setChartData] = useState<IChartDatasetItem[]>([])
  const [tagsChartData, setTagsChartData] = useState<IChartDatasetItem[]>([])
  const [sortedExpenses, setSortedExpenses] = useState<IExpensesByCategories>({})

  const fetchDashboardData = () => {
    dispatch(fetchCategories())
    dispatch(fetchTags())
    dispatch(fetchExpenses())
  }

  const combineDataset = () => {
    const expensesSortedByCategory: IExpensesByCategories = separateExpensesByCategories(
      expenses,
      categories,
    )
    const dataset: IChartDatasetItem[] = generateDatasetForPieChart(expensesSortedByCategory)
    const expensesSortedByTags: IExpensesByTags = separateExpensesByTags(expenses, tags)
    const datasetForTags: IChartDatasetItem[] = generateDatasetForPieChart(expensesSortedByTags)

    setChartData(dataset)
    setTagsChartData(datasetForTags)
    setSortedExpenses(expensesSortedByCategory)
  }

  const removeExpense = ({ expenseId }: IRemoveExpense) => {
    removeExpenseById({ expenseId })
      .then(() => {
        fetchDashboardData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (expenses.length && categories.length && tags.length) {
      combineDataset()
    }
  }, [expenses, categories, tags])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <PageContainer>
      <PageTitle>Dashboard</PageTitle>
      <Paper style={{ marginBottom: 50, padding: '30px 0' }}>
        <Grid container>
          <Grid item md={6}>
            <StyledPieChart chartData={categoriesChartData} />
          </Grid>
          <Grid item md={6}>
            <StyledPieChart chartData={tagsChartData} />
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={12}>
          {Object.entries(sortedExpenses).map(([key, value]) => {
            return (
              <Grid container key={key}>
                <Grid item xs={12}>
                  <Typography variant="h6">{key}</Typography>
                  <StyledList>
                    {value.map((expense: IExpense) => {
                      return (
                        <StyledListItem
                          key={expense._id}
                          editHandler={() => {}}
                          removeHandler={() => removeExpense({ expenseId: expense._id })}
                        >
                          {expense.name} - {expense.value}
                        </StyledListItem>
                      )
                    })}
                  </StyledList>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export default Dashboard