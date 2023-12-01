import { createContext } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchJobPositions } from "../services/local/jobPositions";
import { apiStoreJobPosition } from "../services/local/jobPositions/create";
import { apiUpdateJobPosition } from "../services/local/jobPositions/update";
import { apiDeleteJobPosition } from "../services/local/jobPositions/delete";

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
        if (!jobPositions || jobPositions?.length === 0) {
          return mutateData([data.jobPosition]);
        }
        console.log(data);
        mutateData([...jobPositions, data.jobPosition]);
      } catch (error) {
        console.log("error on category store");
        throw error;
      }
  };
  const updateJobPosition = async (jobPosition, jobPositionId) => {
    try {
        const data = await apiUpdateJobPosition(jobPosition, jobPositionId);
      
        if (jobPositions && jobPositions.length !== 0) {
          const newJobPositions = jobPositions.map((jp) => {
            if (jp.id == jobPositionId) {
              return data.jobPosition;
            }
            return jp;
          });
          console.log('newJobPositions', newJobPositions);
          return mutateData(newJobPositions);
        }
  
      } catch (error) {
        console.log("error on category update");
        throw error;
      }
  };

  

  const deleteJobPosition = async (jobPositionId) => {
    try {
      const data = await apiDeleteJobPosition(jobPositionId);
      console.log(data)

      if (jobPositions && jobPositions.length !== 0) {
        const newJobPositions = jobPositions.filter((jobPosition) => {
          if (jobPosition.id != jobPositionId) {
            return jobPosition;
          }
          return;
        });
        return mutateData(newJobPositions);
      }
    } catch (error) {
      console.log("error on deleteJobPosition");
      throw error;
    }
  };

  return (
    <JobPositionsContext.Provider
      value={{
        updateJobPosition,
        storeJobPosition,
        deleteJobPosition,
        jobPositions,
        error,
        loading,
      }}
    >
      {children}
    </JobPositionsContext.Provider>
  );
};
