import { Avatar, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import Icon from '@mui/material/Icon'
import { IExpense, ICategory } from '../../../common/interfaces'
import { formatDate } from '../../../common/helpers'

interface Props {
  expense: IExpense
  expenseCategory: ICategory
}

const ExpenseListItemContent = ({ expense, expenseCategory }: Props) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          style={{
            background: 'transparent',
            border: `1px solid ${expenseCategory.color}`,
          }}
        >
          <Icon style={{ color: expenseCategory?.color || '#555' }}>
            {expenseCategory?.icon || 'pets'}
          </Icon>
        </Avatar>
      </ListItemAvatar>
      <Typography variant="h6" color="#d96621">{`${expense.value} CZK`}</Typography>
      <ListItemText primary={expense.name} secondary={expense.description} />
      <Typography>{formatDate(expense.createdAt)}</Typography>
    </>
  )
}

export default ExpenseListItemContent
