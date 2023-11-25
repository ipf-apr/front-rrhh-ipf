import { Route, Routes } from "react-router-dom";
import { JobPositionsIndex } from "../pages/JobPositions/JobPositionsIndex";
import { JobPositionsContextProvider } from "../contexts/JobPositionsContext";

export const JobPositionsRoutes = () => {
  return (
    <JobPositionsContextProvider>
      <Routes>
        <Route path="/" element={<JobPositionsIndex />} />
      </Routes>
    </JobPositionsContextProvider>
  );
};
