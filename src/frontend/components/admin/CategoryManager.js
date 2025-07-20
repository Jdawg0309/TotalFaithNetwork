import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { 
  ContentHeader, 
  CategoryManagerContainer, 
  CategoryForm, 
  CategoryInput, 
  AddButton, 
  CategoryList, 
  CategoryItem, 
  CategoryName, 
  DeleteCategoryButton 
} from '../shared/StyledComponents';

const CategoryManager = ({
  categories,
  newCategory,
  setNewCategory,
  createCategory,
  deleteCategory
}) => {
  return (
    <>
      <ContentHeader>
        <h1>Manage Categories</h1>
      </ContentHeader>
      <CategoryManagerContainer>
        <CategoryForm>
          <CategoryInput
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
          />
          <AddButton onClick={createCategory}>
            <FiPlus size={16} />
            Add
          </AddButton>
        </CategoryForm>
        
        <CategoryList>
          {categories.map((cat) => (
            <CategoryItem key={cat.id}>
              <CategoryName>{cat.name}</CategoryName>
              <DeleteCategoryButton onClick={() => deleteCategory(cat.id)}>
                <FiMinus size={14} />
              </DeleteCategoryButton>
            </CategoryItem>
          ))}
        </CategoryList>
      </CategoryManagerContainer>
    </>
  );
};

export default CategoryManager;