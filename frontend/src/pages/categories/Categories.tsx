import { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import PageHeaderBox from '../../components/PageHeaderBox'
import { removeCategoryById } from '../../api'
import PageContainer from '../../components/PageContainer'
import StyledList from '../../components/StyledList'
import StyledListItem from '../../components/StyledListItem'
import CategoryListItemContent from './components/CategoryListItemContent'
import { IRemoveCategoryById } from '../../common/interfaces'
import { fetchCategories } from '../../redux/categories/categoriesSlice'
import { selectAllCategories } from '../../redux/categories/selectors'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ModalWindow from '../../components/ModalWindow'
import { setModalState } from '../../redux/modal/modalSlice'
import CategoriesFieldset from './components/CategoriesFieldset'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectAllCategories)
  const [categoryToEdit, setCategoryToEdit] = useState<string>('')

  const removeCategory = ({ categoryId }: IRemoveCategoryById) => {
    removeCategoryById({ categoryId })
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openEditCategoryModal = ({ id }: { id: string }) => {
    setCategoryToEdit(id)
    dispatch(setModalState(true))
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <PageContainer>
      <PageTitle>Categories</PageTitle>
      <PageHeaderBox>
        <CategoriesFieldset />
      </PageHeaderBox>

      <StyledList>
        {categories.map((category) => {
          return (
            <StyledListItem
              key={category._id}
              editHandler={() => openEditCategoryModal({ id: category._id })}
              removeHandler={() => removeCategory({ categoryId: category._id })}
            >
              <CategoryListItemContent category={category} />
            </StyledListItem>
          )
        })}
      </StyledList>
      <ModalWindow>
        <PageHeaderBox>
          <CategoriesFieldset edit={true} categoryToEdit={categoryToEdit} />
        </PageHeaderBox>
      </ModalWindow>
    </PageContainer>
  )
}

export default Categories
