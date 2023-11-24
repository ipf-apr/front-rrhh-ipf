import { Routes, Route } from "react-router-dom";
import { CategoriesIndex } from "../pages/Categories/CategoriesIndex";
import { CategoriesContextProvider } from "../contexts/CategoriesContext";

export const CategoriesRoutes = () => {
  return (
    <CategoriesContextProvider>
      <Routes>
        <Route path="/" element={<CategoriesIndex />} />
      </Routes>
    </CategoriesContextProvider>
  );
};
