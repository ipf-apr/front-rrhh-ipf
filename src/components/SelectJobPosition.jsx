import { usePromise } from "../hooks/usePromise";
import { fetchJobPositions } from "../services/local/jobPositions";
import { ShowErrors } from "./ShowErrors";
import { Spinner } from "./Spinner";

export const SelectJobPosition = ({ handleInputChange, value }) => {
  const {
    data: allJobPositions,
    error,
    loading: loadingJobPositions,
  } = usePromise(fetchJobPositions);
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
