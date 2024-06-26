import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchCategories } from "../services/local/categories";
import { apiStoreCategory } from "../services/local/categories/create";
import { apiUpdateCategory } from "../services/local/categories/update";
import { apiDeleteCategory } from "../services/local/categories/delete";

export const CategoriesContext = createContext({});

export const CategoriesContextProvider = ({ children }) => {
  const {
    data: categories,
    error,
    loading,
    mutateData,
  } = usePromise(fetchCategories);

  const storeCategory = async (category) => {
    try {
      const data = await apiStoreCategory(category);
      if (!categories && categories.length === 0) {
        return mutateData([data]);
      }
      mutateData([...categories, data.category]);
    } catch (error) {
      console.log("error on category store");
      throw error;
    }
  };

  const updateCategory = async (category, categoryId) => {
    try {
      const data = await apiUpdateCategory(category, categoryId);
    
      if (categories && categories.length !== 0) {
        const newCategories = categories.map((cat) => {
          if (cat.id == categoryId) {
            return data.category;
          }
          return cat;
        });
        console.log('newCategories', newCategories);
        return mutateData(newCategories);
      }

    } catch (error) {
      console.log("error on category update");
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const data = await apiDeleteCategory(categoryId);

      console.log(data)

      if (categories && categories.length !== 0) {
        const newCategories = categories.filter((category) => {
          if (category.id != categoryId) {
            return category;
          }
          return;
        });
        return mutateData(newCategories);
      }
    } catch (error) {
      console.log("error on deleteCategory");
      throw error;
    }
  }

  return (
    <CategoriesContext.Provider
      value={{
        storeCategory,
        updateCategory,
        deleteCategory,
        categories,
        error,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
