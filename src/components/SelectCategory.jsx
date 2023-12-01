import { useEffect, useState } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchCategories } from "../services/local/categories";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectCategory = ({
  handleInputChange,
  setCategoryName,
  value,
}) => {
  const {
    data: allCategories,
    error,
    loading: loadingCategories,
  } = usePromise(fetchCategories);

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      const category = allCategories.find(
        (category) => category.id == value
        );
        if (category) {
          setCategoryName(category.name);
        }
      }
    }, [value])
    
    return (
    <>
      {error && <ShowErrors error={error} />}

      {loadingCategories && <Spinner />}
      
      <select
        className="form-select"
        name="selectedCategory"
        id="selectedCategory"
        onChange={handleInputChange}
        value={value}
      >
        <option value="">-- Seleccione la Categoría --</option>
        {allCategories &&
          allCategories.map((category) => {
            return (
              <option key={`category-all-${category.id}`} value={category.id}>
                {category.name}
              </option>
            );
          })}
      </select>
    </>
  );
};
