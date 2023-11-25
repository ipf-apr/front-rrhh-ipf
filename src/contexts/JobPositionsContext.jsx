import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchJobPositions } from "../services/local/jobPositions";
import { apiStoreJobPosition } from "../services/local/jobPositions/create";

export const JobPositionsContext = createContext({});

export const JobPositionsContextProvider = ({ children }) => {
  const {
    data: jobPositions,
    error,
    loading,
    mutateData,
  } = usePromise(fetchJobPositions);

  const storeJobPosition = async (jobPosition) => {
    try {
        const data = await apiStoreJobPosition(jobPosition);
        if (!jobPositions && jobPositions.length === 0) {
          return mutateData([data]);
        }
        console.log(data);
        mutateData([...jobPositions, data.jobPosition]);
      } catch (error) {
        console.log("error on category store");
        throw error;
      }
  };
  const updateJobPosition = async () => {};

  return (
    <JobPositionsContext.Provider
      value={{
        updateJobPosition,
        storeJobPosition,
        jobPositions,
        error,
        loading,
      }}
    >
      {children}
    </JobPositionsContext.Provider>
  );
};
