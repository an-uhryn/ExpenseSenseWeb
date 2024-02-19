import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Categories from "../pages/categories/Categories";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/categories' element={<Categories />} />
    </Routes>
  )
}

export default Router
