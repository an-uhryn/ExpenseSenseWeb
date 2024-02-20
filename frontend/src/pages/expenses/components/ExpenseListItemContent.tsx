import { Avatar, ListItemAvatar, ListItemText } from '@mui/material'
import Icon from '@mui/material/Icon'
import { IExpense, ICategory } from '../../../common/interfaces'

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
            border: '1px solid #555',
          }}
        >
          <Icon style={{ color: expenseCategory?.color || '#555' }}>
            {expenseCategory?.icon || 'pets'}
          </Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={expense.name} secondary={expense.description} />
    </>
  )
}

export default ExpenseListItemContent
