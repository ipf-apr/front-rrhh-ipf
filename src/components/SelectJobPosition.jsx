import { useEffect, useState } from "react";
import { usePromise } from "../hooks/usePromise";
import { fetchJobPositions } from "../services/local/jobPositions";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectJobPosition = ({
  handleInputChange,
  value,
  setJobName,
}) => {
  const {
    data: allJobPositions,
    error,
    loading: loadingJobPositions,
  } = usePromise(fetchJobPositions);

  useEffect(() => {
    if (allJobPositions && allJobPositions.length > 0) {
      const jobPosition = allJobPositions.find(
        (jobPosition) => jobPosition.id == value
      );
      if (jobPosition) {
        setJobName(jobPosition.position);
      }
    }
  }, [value]);
  return (
    <>
      {error && <ShowErrors error={error} />}

      {loadingJobPositions && <Spinner />}
      <select
        className="form-select"
        name="selectedJobPosition"
        id="selectedJobPosition"
        onChange={handleInputChange}
        value={value}
      >
        <option value="">-- Seleccione el puesto --</option>
        {allJobPositions &&
          allJobPositions.map((jobPosition) => {
            return (
              <option
                key={`job-position-all-${jobPosition.id}`}
                value={jobPosition.id}
              >
                {jobPosition.position}
              </option>
            );
          })}
      </select>
    </>
  );
};
