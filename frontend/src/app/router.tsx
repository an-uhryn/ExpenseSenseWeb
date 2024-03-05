import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Categories from '../pages/categories/Categories'
import Tags from '../pages/tags/Tags'
import Expenses from '../pages/expenses/Expenses'
import Groups from '../pages/groups/Groups'
import Profile from '../pages/profile/Profile'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default Router
