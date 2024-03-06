import { Grid, Typography } from '@mui/material'
import StyledList from '../../../components/StyledList'
import { IExpense, IExpensesByCategories, IRemoveExpense } from '../../../common/interfaces'
import StyledListItem from '../../../components/StyledListItem'
import { removeExpenseById } from '../../../api'
import { fetchCategories } from '../../../redux/categories/categoriesSlice'
import { fetchTags } from '../../../redux/tags/tagsSlice'
import { fetchExpenses } from '../../../redux/expenses/expensesSlice'
import { useAppDispatch } from '../../../redux/hooks'

const DashboardDataList = ({ sortedExpenses }: { sortedExpenses: IExpensesByCategories }) => {
  const dispatch = useAppDispatch()

  const removeExpense = ({ expenseId }: IRemoveExpense) => {
    removeExpenseById({ expenseId })
      .then(() => {
        dispatch(fetchCategories())
        dispatch(fetchTags())
        dispatch(fetchExpenses())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
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
                      <Typography style={{ width: '100%' }}>
                        {expense.name} - {expense.value}
                      </Typography>
                    </StyledListItem>
                  )
                })}
              </StyledList>
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default DashboardDataList
