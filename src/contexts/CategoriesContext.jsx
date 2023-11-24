import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchCategories } from "../services/local/categories";
import { apiStoreCategory } from "../services/local/categories/create";

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

  return (
    <CategoriesContext.Provider
      value={{
        storeCategory,
        categories,
        error,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
