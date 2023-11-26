import { Route, Routes } from "react-router-dom";
import { SkillsIndex } from "../pages/Skills/SkillsIndex";
import { SkillsContextProvider } from "../contexts/SkillsContext";

export const SkillsRoutes = () => {
  return (
    <SkillsContextProvider>
      <Routes>
        <Route path="/" element={<SkillsIndex />} />
      </Routes>
    </SkillsContextProvider>
  );
};
